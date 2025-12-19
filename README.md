# Waggle 🐾

**Live Demo:** [https://waggle.up.railway.app]

## About Waggle

Waggle is a pet care management application born from a real family's need. Inspired by a large family who loves their dog but struggled with coordination across different schedules, Waggle solves the common problem of miscommunication about daily pet care activities.

When multiple family members care for a pet, critical questions arise: Has the dog been fed? Did someone take them for a walk? Most importantly, has medication been administered? Missing or duplicating medication doses can be dangerous for beloved pets.

Waggle brings clarity and coordination to pet care, ensuring every family member stays informed about their pet's daily routine.

## Features

- **Dashboard** - Quick overview of today's activities and last recorded care events
- **Pet Profiles** - Manage multiple pets with detailed information (breed, age, weight, allergies, dietary restrictions)
- **Activity Logging** - Track feeding, walks, play sessions, water, and medications
- **Multi-User Support** - Owner and Caregiver roles for family coordination

## Tech Stack

* **Frontend Framework:** React + Vite
* **Backend Framework:** Node.js + Express
* **Language:** TypeScript
* **Styling:** Tailwind CSS, Headless UI, React Icons
* **Database:** PostgreSQL + Prisma ORM
* **Infrastructure:** Supabase (PostgreSQL hosting)


## Future Roadmap

### Planned Features

#### Mobile Application
- Native iOS and Android apps for on-the-go pet care management
- Push notifications for medication reminders and activity updates
- Offline mode for logging activities without internet connection

#### Telegram Bot Integration
- Quick activity logging via Telegram commands (e.g., `/fed breakfast`, `/walk 30mins`)
- Real-time notifications to family group chats when activities are logged
- Voice message support for adding activity notes

#### Upcoming Tasks & Task Assignment
- Task scheduling system showing upcoming feeding times, walks, and medication doses
- Task assignment to specific caregivers with "I'll handle it" confirmation
- Task status tracking (Pending, In Progress, Completed)
- Automatic reminders for overdue tasks

#### Advanced Activity Filtering
- Filter activities by pet, date range, or activity type
- Search functionality for finding specific activities or notes
- Export activity logs as PDF or CSV for vet visits
- Activity statistics and insights (daily/weekly/monthly summaries)

#### Additional Enhancements
- Photo uploads for activities (meal photos, walk locations, etc.)
- Veterinarian contact integration
- Medical records and vaccination tracking
- Multi-pet household dashboard view
- Activity templates for recurring tasks