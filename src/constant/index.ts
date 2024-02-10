import { SetMetadata } from '@nestjs/common';
export * from './enum';

export const JWT_SECRET = 'secret123@123';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
