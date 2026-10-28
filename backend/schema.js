import { z } from 'zod';
import config from '../config.js';

const isValidTimezone = tz => {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    } catch {
        return false;
    }
};

export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(config.listPerPage),
});

export const useridQuerySchema = z.object({
    userid: z.coerce.number().int().min(1),
});

export const videosSortQuerySchema = z.object({
    sortBy: z.enum(['uservideoId', 'lastPlayedTimestamp']).default('uservideoId'),
});

export const searchTermQuerySchema = z.object({
    searchTerm: z.string().min(2).max(255),
});

export const letterFilterQuerySchema = z.object({
    filter: z.enum('ABCDEFGHIJKLMNOPQRSTUVWXYZ_'.split('')).optional(),
});

export const timezoneQuerySchema = z.object({
    tz: z.string().refine(tz => isValidTimezone, 'Invalid timezone').default('UTC'),
});

export const nicknameParamSchema = z.object({
    nickname: z.string().min(1).max(30),
});

export const videoIdParamSchema = z.object({
    videoId: z.coerce.number().int().min(1),
});

export const artistIdParamSchema = z.object({
    artistId: z.coerce.number().int().min(1),
});
