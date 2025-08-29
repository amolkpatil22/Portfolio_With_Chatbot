import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsEnum(['project', 'experience', 'personal', 'skill', 'faq'])
  type?: 'project' | 'experience' | 'personal' | 'skill' | 'faq';

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

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