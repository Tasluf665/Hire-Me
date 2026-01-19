const dotenv = require("dotenv");

// Load env vars
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const mongoose = require("mongoose");
const config = require("config");
const { Address } = require("../models/address");
const addressList = require("./address");

async function seedAddresses() {
    if (!config.get("MONGODB_URL")) {
        console.error("FATAL ERROR: MONGODB_URL is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(config.get("MONGODB_URL"));
        console.log("Connected to MongoDB...");

        console.log(`Found ${addressList.length} addresses to process.`);

        let count = 0;
        for (const item of addressList) {
            await Address.findOneAndUpdate(
                { id: item.id },
                {
                    id: item.id,
                    name: item.name,
                    nameLocal: item.nameLocal,
                    parentId: item.parentId,
                    displayName: item.displayName,
                },
                { upsert: true, new: true }
            );
            count++;
            if (count % 100 === 0) {
                console.log(`Processed ${count} addresses...`);
            }
        }

        console.log("Seeding completed successfully.");
        console.log(`Total addresses processed: ${count}`);
    } catch (err) {
        console.error("Error seeding addresses:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seedAddresses();
