import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class DbBaseEntity extends BaseEntity {
  // Use Expose decorator to expose the property to the response if needed
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', nullable: true })
  createdAt: Date | null;
  @CreateDateColumn({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt: Date | null;
  @CreateDateColumn({ type: 'timestamptz', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
