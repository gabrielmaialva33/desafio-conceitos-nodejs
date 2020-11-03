import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repositories')
class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', length: 20, array: true })
  techs: string;

  @Column({ type: 'integer', unsigned: true, default: 0 })
  likes: number;

  /* @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  undate_at: Date; */
}

export default Repository;
