import { prisma } from "./prisma";

export interface ResultAlertPayload {
  examTitle: string;
  examCode?: string;
  course: string;
  semester: number;
  branch?: string;
  session: string;
  resultUrl?: string;
}

export interface CircularAlertPayload {
  title: string;
  category: string;
  pdfUrl: string;
  publishedDate?: Date;
  description?: string;
}

/**
 * Dispatches targeted In-App Result Alerts to all subscribed students
 */
export async function dispatchResultAlerts(payload: ResultAlertPayload) {
  try {
    const { examTitle, course, semester, branch, session, resultUrl } = payload;

    // 1. Find all active explicit ResultSubscription records matching course & semester
    const subscriptions = await prisma.resultSubscription.findMany({
      where: {
        isActive: true,
        course: { equals: course },
        semester: semester,
      },
      include: { user: true },
    });

    // 2. Also find all users whose profile matches this course & semester
    const matchingProfileUsers = await prisma.user.findMany({
      where: {
        course: { equals: course },
        semester: semester,
      },
    });

    const userMap = new Map<string, any>();
    subscriptions.forEach((sub) => {
      if (sub.user) userMap.set(sub.userId, sub.user);
    });
    matchingProfileUsers.forEach((u) => {
      userMap.set(u.id, u);
    });

    const notificationsToCreate: any[] = [];
    const now = new Date();

    for (const [userId, user] of Array.from(userMap.entries())) {
      // Check if user has already received a notification for this examTitle in the last 24h
      const alreadyNotified = await prisma.notification.findFirst({
        where: {
          userId,
          title: { contains: examTitle },
          createdAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
        },
      });

      if (!alreadyNotified) {
        notificationsToCreate.push({
          userId,
          title: `🎉 GTU Result Declared: ${examTitle}`,
          message: `Official results for ${course} Sem ${semester} (${session}) are now declared on gturesults.in. Tap to view your live grade card!`,
          type: "RESULT",
          link: "/results",
          isRead: false,
        });
      }
    }

    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({
        data: notificationsToCreate,
      });
      console.log(`✅ Dispatched ${notificationsToCreate.length} In-App Result Notifications for ${examTitle}`);
    }

    return { dispatched: notificationsToCreate.length };
  } catch (error) {
    console.error("Failed to dispatch result alerts:", error);
    return { dispatched: 0, error };
  }
}

/**
 * Dispatches targeted In-App Circular Alerts to students based on category choices
 */
export async function dispatchCircularAlerts(payload: CircularAlertPayload) {
  try {
    const { title, category, pdfUrl, description } = payload;

    // 1. Find all active CircularSubscription records matching category or "All"
    const subscriptions = await prisma.circularSubscription.findMany({
      where: {
        isActive: true,
        OR: [
          { category: "All" },
          { category: { equals: category } },
        ],
      },
      include: { user: true },
    });

    // 2. Also find all users whose notificationPreferences permit this category
    const allUsers = await prisma.user.findMany({
      select: { id: true, notificationPreferences: true },
    });

    const targetUserIds = new Set<string>();
    subscriptions.forEach((s) => targetUserIds.add(s.userId));

    for (const u of allUsers) {
      if (u.notificationPreferences) {
        try {
          const prefs = JSON.parse(u.notificationPreferences);
          if (prefs.circularAlerts !== false) {
            if (!prefs.selectedCategories || prefs.selectedCategories.includes("All") || prefs.selectedCategories.includes(category)) {
              targetUserIds.add(u.id);
            }
          }
        } catch (e) {
          targetUserIds.add(u.id);
        }
      } else {
        // Default: alert all active users for official GTU circulars
        targetUserIds.add(u.id);
      }
    }

    const notificationsToCreate: any[] = [];
    const now = new Date();

    for (const userId of Array.from(targetUserIds)) {
      const alreadyNotified = await prisma.notification.findFirst({
        where: {
          userId,
          title: { contains: title.substring(0, 40) },
          createdAt: { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
        },
      });

      if (!alreadyNotified) {
        notificationsToCreate.push({
          userId,
          title: `📢 New GTU Circular: ${title.length > 70 ? title.substring(0, 67) + "..." : title}`,
          message: `[${category}] ${description || "Official circular published on GTU Portal. Tap to download PDF."}`,
          type: "CIRCULAR",
          link: "/circulars",
          isRead: false,
        });
      }
    }

    if (notificationsToCreate.length > 0) {
      await prisma.notification.createMany({
        data: notificationsToCreate,
      });
      console.log(`✅ Dispatched ${notificationsToCreate.length} In-App Circular Notifications for ${title}`);
    }

    return { dispatched: notificationsToCreate.length };
  } catch (error) {
    console.error("Failed to dispatch circular alerts:", error);
    return { dispatched: 0, error };
  }
}

/**
 * Sends an instant test in-app notification to a specific user
 */
export async function sendTestNotification(userId: string, type: "RESULT" | "CIRCULAR" | "SYSTEM" = "RESULT") {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    let title = "";
    let message = "";
    let link = "";

    if (type === "RESULT") {
      title = `🎉 [Test Alert] ${user.course || "BE"} Sem ${user.semester || 5} Results Declared!`;
      message = `This is a live test notification for your result alert subscription (${user.branch || "Engineering"}). Your in-app alert channel is active.`;
      link = "/results";
    } else if (type === "CIRCULAR") {
      title = `📢 [Test Alert] GTU Examination Schedule & Timetable Notice`;
      message = `This is a live test notification for your circular alert subscription. You will receive in-app alerts whenever new GTU notices are published.`;
      link = "/circulars";
    } else {
      title = `🔔 [Test Alert] GTU All In One Notification Channel`;
      message = `In-app notifications are active and synchronized with your academic profile.`;
      link = "/profile";
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        link,
        isRead: false,
      },
    });

    return notification;
  } catch (error) {
    console.error("Failed to send test notification:", error);
    return null;
  }
}
