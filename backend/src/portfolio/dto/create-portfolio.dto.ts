import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class CreatePortfolioDto {
  @IsEnum(['project', 'experience', 'personal', 'skill', 'faq'])
  type: 'project' | 'experience' | 'personal' | 'skill' | 'faq';

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsObject()
  metadata?: {
    tech_stack?: string[];
    role?: string;
    duration?: string;
    links?: object;
    [key: string]: any;
  };
}