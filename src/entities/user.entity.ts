import {AbstractEntity} from './abstract-entity';
import {BeforeInsert, Column, Entity, JoinTable, ManyToMany} from 'typeorm';
import {IsEmail} from 'class-validator';
import {classToPlain, Exclude} from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({unique: true})
  @IsEmail()
  email: string;
  
  @Column()
  username: string;
  
  @Column({default: ''})
  bio: string;
  
  @Column({default: null, nullable: true})
  image: string | null;
  
  @Column()
  @Exclude()
  password: string;
  
  @ManyToMany(
    type => UserEntity,
      user => user.followee)
  @JoinTable()
  followers: UserEntity[];
  
  @ManyToMany(type => UserEntity, user => user.followers)
  @JoinTable()
  followee: UserEntity[];
  
  @BeforeInsert()
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  public async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
  
  public toJson() {
    return classToPlain(this)
  }
  
  public toProfile(user: UserEntity) {
    const following = this.followers.includes(user);
    const profile: any = this.toJson();
    delete profile.followers;
    return {...profile, following}
  }
}
