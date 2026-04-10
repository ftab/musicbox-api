const { z } = require('zod');
const config = require('../config');

const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(config.listPerPage),
});

const useridQuerySchema = z.object({
    userid: z.coerce.number().int().min(1),
});

const videosSortQuerySchema = z.object({
    sortBy: z.enum(['uservideoId', 'lastPlayedTimestamp']).default('uservideoId'),
});

const searchTermQuerySchema = z.object({
    searchTerm: z.string().min(1).max(255),
});

const nicknameParamSchema = z.object({
    nickname: z.string().min(1).max(30),
});

const videoIdParamSchema = z.object({
    videoId: z.coerce.number().int().min(1),
});

const artistIdParamSchema = z.object({
    artistId: z.coerce.number().int().min(1),
});

module.exports = {
    paginationQuerySchema,
    useridQuerySchema,
    videosSortQuerySchema,
    searchTermQuerySchema,
    nicknameParamSchema,
    videoIdParamSchema,
    artistIdParamSchema,
}
