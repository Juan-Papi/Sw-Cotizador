import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../../profile/entities/profile.entity';
import { Membership } from '../../membership/entities/membership.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column('text')
  name: string;

  @ApiProperty()
  @Column('text')
  lastName: string;

  @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Membership, (membership) => membership.user) // specify inverse side as a second parameter
  membership: Membership;

  @BeforeInsert() //trigger
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate() //trigger
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
