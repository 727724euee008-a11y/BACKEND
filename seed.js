const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eventhub');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Event.deleteMany();
    await Registration.deleteMany();
    console.log('Cleared existing data.');

    // 1. Create Demo Organizer
    const organizer = await User.create({
      name: 'Dr. Ramesh Kumar',
      email: 'organizer@college.edu',
      password: 'Organizer@123',
      phone: '9840123456',
      college: 'PSG College of Technology',
      role: 'organizer'
    });

    // 2. Create Demo Participant
    const participant = await User.create({
      name: 'Rahul Sharma',
      email: 'student@college.edu',
      password: 'Student@123',
      phone: '9876543210',
      college: 'PSG College of Technology',
      role: 'participant'
    });

    console.log('Created Demo Organizer & Demo Participant');

    // Dates calculation helper
    const now = new Date();
    const addDays = (days) => {
      const d = new Date();
      d.setDate(now.getDate() + days);
      return d;
    };

    // 3. Create at least 8 realistic college events
    const eventsData = [
      {
        organizer: organizer._id,
        title: 'HackNova 2026 – 24-Hour National Hackathon',
        description: 'Join hundreds of student developers, designers, and innovators to solve real-world industry challenges across AI, Web3, FinTech, and Green Tech. Mentorship and food provided throughout the hackathon.',
        category: 'Hackathon',
        date: addDays(14),
        time: '09:00 AM - 09:00 AM (Next Day)',
        venue: 'Main Innovation Lab & Tech Center, Block D',
        registrationDeadline: addDays(10),
        capacity: 150,
        rules: '1. Teams of 2 to 4 members.\n2. Laptops and chargers must be brought by participants.\n3. Pre-written project code is strictly prohibited.\n4. College ID is required during physical check-in.',
        contactEmail: 'hacknova@college.edu',
        contactPhone: '9840112233'
      },
      {
        organizer: organizer._id,
        title: 'Hands-on Full-Stack Web Development with MERN',
        description: 'A comprehensive technical workshop diving into building production-grade REST APIs, MongoDB schemas, React hooks, and responsive Bootstrap layouts. Perfect for 2nd and 3rd year students.',
        category: 'Workshop',
        date: addDays(7),
        time: '10:00 AM - 04:30 PM',
        venue: 'CSE Seminar Hall 2, 3rd Floor',
        registrationDeadline: addDays(5),
        capacity: 60,
        rules: '1. Basic knowledge of JavaScript is recommended.\n2. Please carry your personal laptop with Node.js pre-installed.\n3. Certificate of participation will be awarded.',
        contactEmail: 'webworkshop@college.edu',
        contactPhone: '9840223344'
      },
      {
        organizer: organizer._id,
        title: 'CodeSprint – Annual Inter-College Coding Contest',
        description: 'Compete in algorithmic problem solving, dynamic programming, and data structures challenges. Test your speed, accuracy, and algorithmic thinking on a standardized competitive platform.',
        category: 'Technical',
        date: addDays(12),
        time: '02:00 PM - 05:00 PM',
        venue: 'Central Computer Center, Lab 3',
        registrationDeadline: addDays(9),
        capacity: 100,
        rules: '1. Individual participation only.\n2. Allowed languages: C++, Java, Python.\n3. Plagiarism results in instant disqualification.',
        contactEmail: 'codesprint@college.edu',
        contactPhone: '9840334455'
      },
      {
        organizer: organizer._id,
        title: 'Autonomous Robotics & IoT Hands-on Bootcamp',
        description: 'Learn microcontrollers, sensor integration, Arduino/ESP32 programming, and assemble line-following and obstacle-avoiding mobile robots in team-based lab sessions.',
        category: 'Workshop',
        date: addDays(18),
        time: '09:30 AM - 04:00 PM',
        venue: 'Mechatronics & Robotics Center',
        registrationDeadline: addDays(14),
        capacity: 45,
        rules: '1. Hardware components kit will be provided per team.\n2. Wear closed-toe shoes in the robotics lab.\n3. Teams of 3 members.',
        contactEmail: 'robotics@college.edu',
        contactPhone: '9840445566'
      },
      {
        organizer: organizer._id,
        title: 'Tarang 2026 – Annual College Cultural Fest',
        description: 'Experience the largest cultural celebration on campus featuring battle of the bands, classical and western group dance competitions, theatrical plays, and celebrity night performances.',
        category: 'Cultural',
        date: addDays(21),
        time: '05:00 PM - 10:00 PM',
        venue: 'University Open Air Auditorium',
        registrationDeadline: addDays(16),
        capacity: 800,
        rules: '1. Entry by registered digital pass only.\n2. Strict security screening at gate.\n3. Outside food and beverages are not permitted.',
        contactEmail: 'tarang@college.edu',
        contactPhone: '9840556677'
      },
      {
        organizer: organizer._id,
        title: 'Inter-Department Cricket & Futsal Championship',
        description: 'Annual college sports league featuring men and women department teams competing in knockout tournaments for the coveted Chancellor Trophy.',
        category: 'Sports',
        date: addDays(25),
        time: '08:00 AM - 06:00 PM',
        venue: 'College Sports Pavilion & Ground A',
        registrationDeadline: addDays(20),
        capacity: 200,
        rules: '1. Official sports attire and shoes are mandatory.\n2. Teams must be registered through department sports captains.\n3. Referees decision will be final.',
        contactEmail: 'sports@college.edu',
        contactPhone: '9840667788'
      },
      {
        organizer: organizer._id,
        title: 'StartUp Odyssey – Entrepreneurship & Venture Capital Seminar',
        description: 'Hear from successful college alumni founders and angel investors on finding product-market fit, pitching to VCs, acquiring initial customers, and securing seed funding.',
        category: 'Seminar',
        date: addDays(9),
        time: '11:00 AM - 01:30 PM',
        venue: 'Management Studies Auditorium',
        registrationDeadline: addDays(6),
        capacity: 120,
        rules: '1. Formal or business casual dress code.\n2. Q&A session open to all attendees.\n3. Networking lunch included.',
        contactEmail: 'ecell@college.edu',
        contactPhone: '9840778899'
      },
      {
        organizer: organizer._id,
        title: 'Inovista – National Level Technical Symposium',
        description: 'Paper presentations, project displays, circuit debugging, and tech quiz competitions for engineering students from across the country.',
        category: 'Symposium',
        date: addDays(16),
        time: '09:00 AM - 05:00 PM',
        venue: 'Convention Center, Halls A & B',
        registrationDeadline: addDays(11),
        capacity: 350,
        rules: '1. Paper abstracts must be submitted prior to the deadline.\n2. Maximum 3 authors per paper.\n3. Registration kit and lunch included.',
        contactEmail: 'inovista@college.edu',
        contactPhone: '9840889900'
      }
    ];

    const createdEvents = await Event.insertMany(eventsData);
    console.log(`Created ${createdEvents.length} realistic college events.`);

    // 4. Create an initial registration for demo participant to test 'My Registrations'
    await Registration.create({
      participant: participant._id,
      event: createdEvents[0]._id, // HackNova 2026
      registeredAt: new Date(),
      status: 'Registered'
    });

    console.log('Created sample registration for Demo Participant.');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();

