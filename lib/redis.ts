import { Redis } from '@upstash/redis'

import { redisUrl,redisToken } from './env-values';
const redis = new Redis({
  url: redisUrl,
  token: redisToken,
})

export default redis