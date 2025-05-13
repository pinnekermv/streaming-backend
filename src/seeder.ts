import { DataSource } from 'typeorm';
import { Streaming } from './streaming/streaming.entity';
import { User } from './users/users.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'streamingDB',
  entities: [User, Streaming],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const streamingRepository = AppDataSource.getRepository(Streaming);
  const userRepository = AppDataSource.getRepository(User);

  const userList = [
    userRepository.create({
      username: 'admin',
      password: 'Qwerty1!',
    }),
  ];

  const streamingList = [
    streamingRepository.create({
      title: 'Carried by the Wind',
      description: 'In a tranquil meadow, tall grasses move in unison, orchestrated by an unseen breeze. Each blade dances to the rhythm of the Earth’s breath—an elegant display of life in motion, where even silence speaks.',
      thumbnail: 'http://bit.ly/4jYT5UK',
      videoUrl: 'https://cdn.pixabay.com/video/2024/03/12/203923-922675870_small.mp4',
    }),
    streamingRepository.create({
      title: 'The Sky in Revolt',
      description: 'Born from the collision of warm, moist air and cold, dry currents, this twisting column of wind can reach speeds over 300 miles per hour. It carves across the land with chaotic precision, lifting debris, uprooting trees, and altering landscapes in seconds.',
      thumbnail: 'https://shorturl.at/Xwbx1',
      videoUrl: 'https://cdn.pixabay.com/video/2019/03/18/22070-325253460_small.mp4',
    }),
    streamingRepository.create({
      title: 'Where the River Moves the Earth',
      description: 'What seems like a simple flow of water is, in truth, a powerful sculptor of landscapes. Each wave strikes stone with purpose, carrying sediment and stories from distant mountains toward unknown destinations. The constant rhythm—fluid yet unyielding—reminds us that water is not only life, but also change.',
      thumbnail: 'https://shorturl.at/1uGv8',
      videoUrl: 'https://cdn.pixabay.com/video/2025/04/10/271161_small.mp4',
    }),
    streamingRepository.create({
      title: 'Veiled by Mist',
      description: 'Each drop that tumbles over the edge has traveled miles—through soil, over roots, and under sky—before surrendering to gravity’s call. The surrounding air is thick with moisture and sound: a cool whisper of vapor and the rhythmic roar of falling water. Here, nature does not rush. It carves. It shapes. It endures.',
      thumbnail: 'https://bit.ly/4meAiGm',
      videoUrl: 'https://cdn.pixabay.com/video/2020/04/24/37088-413229662_small.mp4',
    }),
    streamingRepository.create({
      title: 'Where Ocean Meets Earth',
      description: 'With relentless force, the sea hammers the shoreline—an ancient dialogue between water and stone. Each crashing wave carves history into the coast, reminding us that the land is never still, and the ocean never sleeps.',
      thumbnail: 'https://bit.ly/3SAu4Tu',
      videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70796-538877060_small.mp4',
    }),
  ];

  await streamingRepository.save(streamingList);
  await userRepository.save(userList);
  console.log('Seed complete');
  process.exit();
}

seed();
