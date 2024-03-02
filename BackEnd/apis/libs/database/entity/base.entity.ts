import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class DbBaseEntity extends BaseEntity {
  // Use Expose decorator to expose the property to the response if needed
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  updatedAt: Date;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  deletedAt: Date;
}
