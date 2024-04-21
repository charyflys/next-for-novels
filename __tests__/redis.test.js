import redis from '../lib/redis'

describe(
    'redis connect',
    () =>  {
        it('redis connect',() => {
            console.log(redis)
            expect(redis).not.toBeNull()
        })
        it('redis set and get',() => {
            const key = 'testkey',
            value = 'testvalue'
            redis.set(key,value)
            const result = redis.get(key)
            result.then(res => {
                console.log(res)
            })
            expect(result).toBe(value)
        })
    }
)