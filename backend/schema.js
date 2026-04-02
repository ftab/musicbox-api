const { z } = require('zod');
const config = require('../config');

const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).default(config.listPerPage),
});

const useridQuerySchema = z.object({
    userid: z.coerce.number().int().min(1),
});

const nicknameParamSchema = z.object({
    nickname: z.coerce.string().max(30),
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
    nicknameParamSchema,
    videoIdParamSchema,
    artistIdParamSchema,
}
