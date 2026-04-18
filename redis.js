import { json } from "express";
import { createClient } from "redis";

export const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis error:', err));

let isConnected = false;

export async function connectRedis(){
    if(!isConnected){
        await client.connect();
        isConnected = true;
        console.log("Redis connected");
    }
}

export async function get(key){
    const data = await client.get(key);
    return data? JSON.parse(data) : null;
}

export async function set(key, value, ttl = 60){
    await client.set(key, JSON.stringify(value), {expiration: {type:'EX', value:ttl}});
}