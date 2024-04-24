import { Exclude } from 'class-transformer';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class DbBaseEntity extends BaseEntity {
  // Use Expose decorator to expose the property to the response if needed
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
