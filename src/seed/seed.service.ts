import { User } from './../auth/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    // await this.deleteTables();
    // await this.insertUsers();

    // return 'SEED EXECUTED';

    try {
      await this.deleteTables();
      const insertedUsers = await this.insertUsers();
      return insertedUsers;
    } catch (error) {
      console.error('Error executing seed:', error);
      throw new Error('Error executing seed');
    }

  }

  private async deleteTables() {
    // const queryBuilder = this.userRepository.createQueryBuilder();
    // await queryBuilder.delete().where({}).execute();

    try {
      await this.userRepository.delete({});
    } catch (error) {
      console.error('Error deleting tables:', error);
      throw new Error('Error deleting tables');
    }
  }

  private async insertUsers() {
    // const seedUsers = initialData.users;

    // const users: User[] = [];

    // seedUsers.forEach((user) => {
    //   users.push(this.userRepository.create(user));
    // });

    // const dbUsers = await this.userRepository.save(seedUsers);

    // return dbUsers[19];

    try {
      const seedUsers = initialData.users;
      const users: User[] = seedUsers.map(user => this.userRepository.create(user));
      return await this.userRepository.save(users);
    } catch (error) {
      console.error('Error inserting users:', error);
      throw new Error('Error inserting users');
    }

  }
}
