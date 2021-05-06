export type Monster = {
    name: string;
    attackStyle: string;
    maxHit: number;
}

export type Dungeon = {
    name: string;
    monsters: string[];
}

export type SlayerTier = {
    name: string;
    monsters: string[];
}

export type IMonsterData = {
    dungeons: Dungeon[],
    slayerTiers: SlayerTier[],
    monsters: Monster[]
}

export const monsterData: IMonsterData = {
    dungeons: [
        {
            name: "Chicken Coop",
            monsters: [
                "Chicken",
                "Chick",
                "Mumma Chicken"
            ]
        },
        {
            name: "Undead Graveyard",
            monsters: [
                "Zombie Hand",
                "Zombie",
                "Ghost",
                "Zombie Leader"
            ]
        },
        {
            name: "Bandit Base",
            monsters: [
                "Bandit Trainee",
                "Bandit",
                "Bandit Leader"
            ]
        },
        {
            name: "Hall of Wizards",
            monsters: [
                "Wizard",
                "Master Wizard",
                "Dark Wizard",
                "Elder Wizard"
            ]
        },
        {
            name: "Spider Forest",
            monsters: [
                "Spider (lv. 51)",
                "Spider (lv. 52)",
                "Evil Spider",
                "Spider King"
            ]
        },
        {
            name: "Miolite Caves",
            monsters: [
                "Miolite Spring",
                "Miolite Trio",
                "Miolite Warden",
                "Miolite Monarch"
            ]
        },
        {
            name: "Deep Sea Ship",
            monsters: [
                "Pirate",
                "First Mate",
                "Pirate Captain",
                "The Kraken"
            ]
        },
        {
            name: "Frozen Cove",
            monsters: [
                "Ice Monster",
                "Ice Troll",
                "Ice",
                "Protector of Ice"
            ]
        },
        {
            name: "Dragons Den",
            monsters: [
                "Green Dragon",
                "Blue Dragon",
                "Red Dragon",
                "Black Dragon",
                "Elder Dragon"
            ]
        },
        {
            name: "Volcanic Cave",
            monsters: [
                "Bat",
                "Big Bat",
                "The Eye",
                "The Resurrected Eye",
                "Vicious Serpent",
                "Fire Spirit",
                "Prat, the Protector of Secrets",
                "Malcs, the Guardian of Melvor"
            ]
        },
        {
            name: "Infernal Stronghold",
            monsters: [
                "Cerberus",
                "Fearful Eye",
                "Red Devil",
                "Phoenix",
                "Incendius",
                "Prat, the Guardian of Secrets",
                "Malcs, the Leader of Dragons"
            ]
        },
        {
            name: "Air God Dungeon",
            monsters: [
                "Air Guard",
                "Air Monster",
                "Air Golem",
                "Aleron",
                "Voltaire",
                "Aeris"
            ]
        },
        {
            name: "Water God Dungeon",
            monsters: [
                "Water Guard",
                "Water Monster",
                "Water Golem",
                "Lissia",
                "Murtia",
                "Glacia"
            ]
        },
        {
            name: "Earth God Dungeon",
            monsters: [
                "Earth Guard",
                "Earth Monster",
                "Earth Golem",
                "Mistral",
                "Ophidia",
                "Terran"
            ]
        },
        {
            name: "Fire God Dungeon",
            monsters: [
                "Fire Guard",
                "Fire Monster",
                "Fire Golem",
                "Pyra",
                "Ignis",
                "Ragnar"
            ]
        }
    ],
    slayerTiers: [
        {
            name: "Easy",
            monsters: [
                "Black Knight",
                "Hill Giant",
                "Giant Crab",
                "Tentacle",
                "Seagull",
                "Confused Pirate",
                "Frozen Archer",
                "Mummy",
                "Statue",
                "Wet Monster",
                "Moist Monster",
                "Sweaty Monster",
                "Many Eyed Monster",
                "Lots of Eyes",
                "Fairy",
                "Goo Monster",
                "Green Goo Monster",
                "Golbin",
                "Ranged Golbin",
                "Chicken",
                "Cow",
                "Junior Farmer",
                "Adult Farmer",
                "Wizard",
                "Steel Knight",
                "Mithril Knight",
                "Bandit Trainee",
                "Bandit",
                "Plant",
            ]
        },
        {
            name: "Normal",
            monsters: [
                "Moss Giant",
                "Frozen Mammoth",
                "Stone Snake",
                "Undead Warewolf",
                "Vampire",
                "Strange Eyed Monser",
                "Eyes",
                "Valkyrie",
                "Angel",
                "Holy Archer",
                "Purple Goo Monster",
                "Scattered Goo Monster",
                "Green Dragon",
                "Blue Dragon",
                "Adamant Knight",
                "Master Wizard",
                "Druid",
                "Thief",
                "Shaman",
                "Turkul Raiders",
                "Turkul Archers",
                "Turkul Throwers",
                "Wandering Bard",
            ]
        },
        {
            name: "Hard",
            monsters: [
                "Fierce Devil",
                "Griffen",
                "Pegasus",
                "Raging Horned Elite",
                "Seething Horned Elite",
                "Red Dragon",
                "Black Dragon",
                "Rune Knight",
                "Dark Wizard",
                "Necromancer",
                "Elementalist",
                "Turkul Giant",
                "Turkul General",
                "Sand Beast",
                "Paladin",
                "Priest"
            ]
        },
        {
            name: "Elite",
            monsters: [
                "Dark Horned Elite",
                "Furious Horned Elite",
                "Rancora Spider",
                "Elder Vampire",
                "Cursed Maiden",
                "Bounty Hunter"
            ]
        },
        {
            name: "Master",
            monsters: [
                "Chaotic Greater Dragon",
                "Hunting Greater Dragon",
                "Wicked Greater Dragon",
                "Umbora",
                "Rokken",
                "Ku-tul",
            ]
        }
    ],
    monsters: [
        {
            name: "Black Knight",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Hill Giant",
            attackStyle: "Melee",
            maxHit: 53
        },
        {
            name: "Giant Crab",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Tentacle",
            attackStyle: "Melee",
            maxHit: 34
        },
        {
            name: "Seagull",
            attackStyle: "Melee",
            maxHit: 23
        },
        {
            name: "Confused Pirate",
            attackStyle: "Melee",
            maxHit: 46
        },
        {
            name: "Frozen Archer",
            attackStyle: "Ranged",
            maxHit: 75
        },
        {
            name: "Mummy",
            attackStyle: "Melee",
            maxHit: 49
        },
        {
            name: "Statue",
            attackStyle: "Melee",
            maxHit: 58
        },
        {
            name: "Wet Monster",
            attackStyle: "Melee",
            maxHit: 74
        },
        {
            name: "Moist Monster",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Sweaty Monster",
            attackStyle: "Melee",
            maxHit: 46
        },
        {
            name: "Many Eyed Monster",
            attackStyle: "Ranged",
            maxHit: 92
        },
        {
            name: "Lots of Eyes",
            attackStyle: "Melee",
            maxHit: 68
        },
        {
            name: "Fairy",
            attackStyle: "Magic",
            maxHit: 170
        },
        {
            name: "Goo Monster",
            attackStyle: "Melee",
            maxHit: 34
        },
        {
            name: "Green Goo Monster",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Golbin",
            attackStyle: "Melee",
            maxHit: 23
        },
        {
            name: "Ranged Golbin",
            attackStyle: "Ranged",
            maxHit: 27
        },
        {
            name: "Chicken",
            attackStyle: "Melee",
            maxHit: 11
        },
        {
            name: "Cow",
            attackStyle: "Melee",
            maxHit: 18
        },
        {
            name: "Junior Farmer",
            attackStyle: "Melee",
            maxHit: 27
        },
        {
            name: "Adult Farmer",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Master Farmer",
            attackStyle: "Melee",
            maxHit: 67
        },
        {
            name: "Wizard",
            attackStyle: "Magic",
            maxHit: 120
        },
        {
            name: "Steel Knight",
            attackStyle: "Melee",
            maxHit: 32
        },
        {
            name: "Mithril Knight",
            attackStyle: "Melee",
            maxHit: 52
        },
        {
            name: "Bandit Trainee",
            attackStyle: "Ranged",
            maxHit: 42
        },
        {
            name: "Bandit",
            attackStyle: "Ranged",
            maxHit: 82
        },
        {
            name: "Plant",
            attackStyle: "Melee",
            maxHit: 11
        },
        {
            name: "Moss Giant",
            attackStyle: "Melee",
            maxHit: 124
        },
        {
            name: "Frozen Mammoth",
            attackStyle: "Melee",
            maxHit: 142
        },
        {
            name: "Stone Snake",
            attackStyle: "Magic",
            maxHit: 120
        },
        {
            name: "Undead Werewolf",
            attackStyle: "Melee",
            maxHit: 77
        },
        {
            name: "Vampire",
            attackStyle: "Ranged",
            maxHit: 105
        },
        {
            name: "Strange Eyed Monster",
            attackStyle: "Melee",
            maxHit: 87
        },
        {
            name: "Eyes",
            attackStyle: "Melee",
            maxHit: 125
        },
        {
            name: "Valkyrie",
            attackStyle: "Melee",
            maxHit: 116
        },
        {
            name: "Angel",
            attackStyle: "Magic",
            maxHit: 190
        },
        {
            name: "Holy Archer",
            attackStyle: "Ranged",
            maxHit: 177
        },
        {
            name: "Purple Goo Monster",
            attackStyle: "Melee",
            maxHit: 63
        },
        {
            name: "Scattered Goo Monster",
            attackStyle: "Melee",
            maxHit: 103
        },
        {
            name: "Green Dragon",
            attackStyle: "Melee",
            maxHit: 143
        },
        {
            name: "Blue Dragon",
            attackStyle: "Melee",
            maxHit: 168
        },
        {
            name: "Adamant Knight",
            attackStyle: "Melee",
            maxHit: 118
        },
        {
            name: "Master Wizard",
            attackStyle: "Magic",
            maxHit: 170
        },
        {
            name: "Druid",
            attackStyle: "Magic",
            maxHit: 81
        },
        {
            name: "Thief",
            attackStyle: "Ranged",
            maxHit: 117
        },
        {
            name: "Shaman",
            attackStyle: "Magic",
            maxHit: 137
        },
        {
            name: "Turkul Riders",
            attackStyle: "Melee",
            maxHit: 82
        },
        {
            name: "Turkul Archers",
            attackStyle: "Ranged",
            maxHit: 112
        },
        {
            name: "Turkul Throwers",
            attackStyle: "Melee",
            maxHit: 132
        },
        {
            name: "Fierce Devil",
            attackStyle: "Melee",
            maxHit: 128
        },
        {
            name: "Griffin",
            attackStyle: "Melee",
            maxHit: 128
        },
        {
            name: "Pegasus",
            attackStyle: "Melee",
            maxHit: 264
        },
        {
            name: "Raging Horned Elite",
            attackStyle: "Melee",
            maxHit: 146
        },
        {
            name: "Seething Horned Elite",
            attackStyle: "Melee",
            maxHit: 243
        },
        {
            name: "Red Dragon",
            attackStyle: "Melee",
            maxHit: 212
        },
        {
            name: "Black Dragon",
            attackStyle: "Melee",
            maxHit: 268
        },
        {
            name: "Rune Knight",
            attackStyle: "Melee",
            maxHit: 212
        },
        {
            name: "Turkul Giant",
            attackStyle: "Melee",
            maxHit: 192
        },
        {
            name: "Paladin",
            attackStyle: "Melee",
            maxHit: 163
        },
        {
            name: "Dark Wizard",
            attackStyle: "Magic",
            maxHit: 210
        },
        {
            name: "Necromancer",
            attackStyle: "Magic",
            maxHit: 163
        },
        {
            name: "Elementalist",
            attackStyle: "Magic",
            maxHit: 240
        },
        {
            name: "Priest",
            attackStyle: "Magic",
            maxHit: 213
        },
        {
            name: "Turkul General",
            attackStyle: "Ranged",
            maxHit: 202
        },
        {
            name: "Sand Beast",
            attackStyle: "Ranged",
            maxHit: 260
        },
        {
            name: "Dark Horned Elite",
            attackStyle: "Melee",
            maxHit: 443
        },
        {
            name: "Bounty Hunter",
            attackStyle: "Melee",
            maxHit: 329
        },
        {
            name: "Cursed Maiden",
            attackStyle: "Magic",
            maxHit: 450
        },
        {
            name: "Furious Horned Elite",
            attackStyle: "Ranged",
            maxHit: 397
        },
        {
            name: "Rancora Spider",
            attackStyle: "Ranged",
            maxHit: 450
        },
        {
            name: "Elder Vampire",
            attackStyle: "Ranged",
            maxHit: 400
        },
        {
            name: "Chaotic Greater Dragon",
            attackStyle: "Melee",
            maxHit: 600
        },
        {
            name: "Umbora",
            attackStyle: "Melee",
            maxHit: 930
        },
        {
            name: "Wicked Greater Dragon",
            attackStyle: "Magic",
            maxHit: 240
        },
        {
            name: "Ku-tul",
            attackStyle: "Magic",
            maxHit: 970
        },
        {
            name: "Hunting Greater Dragon",
            attackStyle: "Ranged",
            maxHit: 600
        },
        {
            name: "Rokken",
            attackStyle: "Ranged",
            maxHit: 1235
        },
        {
            name: "Chick",
            attackStyle: "Melee",
            maxHit: 10
        },
        {
            name: "Mumma Chicken",
            attackStyle: "Melee",
            maxHit: 52
        },
        {
            name: "Zombie Hand",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Zombie",
            attackStyle: "Melee",
            maxHit: 52
        },
        {
            name: "Ghost",
            attackStyle: "Melee",
            maxHit: 62
        },
        {
            name: "Zombie Leader",
            attackStyle: "Melee",
            maxHit: 106
        },
        {
            name: "Bandit Leader",
            attackStyle: "Ranged",
            maxHit: 174
        },
        {
            name: "Elder Wizard",
            attackStyle: "Magic",
            maxHit: 210
        },
        {
            name: "Spider (lv. 51)",
            attackStyle: "Melee",
            maxHit: 72
        },
        {
            name: "Spider (lv. 52)",
            attackStyle: "Melee",
            maxHit: 72
        },
        {
            name: "Evil Spider",
            attackStyle: "Melee",
            maxHit: 102
        },
        {
            name: "Spider King",
            attackStyle: "Melee",
            maxHit: 142
        },
        {
            name: "Miolite Sprig",
            attackStyle: "Melee",
            maxHit: 180
        },
        {
            name: "Miolite Trio",
            attackStyle: "Magic",
            maxHit: 180
        },
        {
            name: "Miolite Warden",
            attackStyle: "Melee",
            maxHit: 180
        },
        {
            name: "Miolite Monarch",
            attackStyle: "Magic",
            maxHit: 240
        },
        {
            name: "Pirate",
            attackStyle: "Melee",
            maxHit: 84
        },
        {
            name: "First Mate",
            attackStyle: "Melee",
            maxHit: 131
        },
        {
            name: "Pirate Captain",
            attackStyle: "Melee",
            maxHit: 177
        },
        {
            name: "The Kraken",
            attackStyle: "Melee",
            maxHit: 204
        },
        {
            name: "Ice Monster",
            attackStyle: "Melee",
            maxHit: 92
        },
        {
            name: "Ice Troll",
            attackStyle: "Melee",
            maxHit: 102
        },
        {
            name: "Ice",
            attackStyle: "Melee",
            maxHit: 102
        },
        {
            name: "Protector of Ice",
            attackStyle: "Melee",
            maxHit: 172
        },
        {
            name: "Elder Dragon",
            attackStyle: "Melee",
            maxHit: 470
        },
        {
            name: "Bat",
            attackStyle: "Melee",
            maxHit: 52
        },
        {
            name: "Big Bat",
            attackStyle: "Melee",
            maxHit: 82
        },
        {
            name: "The Eye",
            attackStyle: "Magic",
            maxHit: 140
        },
        {
            name: "Resurrected Eye",
            attackStyle: "Magic",
            maxHit: 240
        },
        {
            name: "Vicious Serpent",
            attackStyle: "Ranged",
            maxHit: 282
        },
        {
            name: "Fire Spirit",
            attackStyle: "Magic",
            maxHit: 340
        },
        {
            name: "Prat, the Protector of Secrets",
            attackStyle: "Ranged",
            maxHit: 501
        },
        {
            name: "Malcs, the Guardian of Melvor",
            attackStyle: "Melee",
            maxHit: 520
        },
        {
            name: "Cerberus",
            attackStyle: "Melee",
            maxHit: 162
        },
        {
            name: "Fearful Eye",
            attackStyle: "Magic",
            maxHit: 236
        },
        {
            name: "Red Devil",
            attackStyle: "Melee",
            maxHit: 314
        },
        {
            name: "Phoenix",
            attackStyle: "Magic",
            maxHit: 371
        },
        {
            name: "Incendius",
            attackStyle: "Melee",
            maxHit: 433
        },
        {
            name: "Prat, the Guardian of Secrets",
            attackStyle: "Ranged",
            maxHit: 522
        },
        {
            name: "Malcs, the Leader of Dragons",
            attackStyle: "Melee",
            maxHit: 750
        },
        {
            name: "Air Guard",
            attackStyle: "Ranged",
            maxHit: 340
        },
        {
            name: "Air Monster",
            attackStyle: "Melee",
            maxHit: 441
        },
        {
            name: "Air Golem",
            attackStyle: "Ranged",
            maxHit: 650
        },
        {
            name: "Aleron",
            attackStyle: "Melee",
            maxHit: 699
        },
        {
            name: "Voltaire",
            attackStyle: "Ranged",
            maxHit: 713
        },
        {
            name: "Aeris",
            attackStyle: "Ranged",
            maxHit: 650
        },
        {
            name: "Water Guard",
            attackStyle: "Magic",
            maxHit: 370
        },
        {
            name: "Water Monster",
            attackStyle: "Melee",
            maxHit: 650
        },
        {
            name: "Water Golem",
            attackStyle: "Magic",
            maxHit: 845
        },
        {
            name: "Lissia",
            attackStyle: "Magic",
            maxHit: 720
        },
        {
            name: "Murtia",
            attackStyle: "Melee",
            maxHit: 733
        },
        {
            name: "Glacia",
            attackStyle: "Magic",
            maxHit: 1080
        },
        {
            name: "Earth Guard",
            attackStyle: "Ranged",
            maxHit: 320
        },
        {
            name: "Earth Monster",
            attackStyle: "Melee",
            maxHit: 650
        },
        {
            name: "Earth Golem",
            attackStyle: "Melee",
            maxHit: 850
        },
        {
            name: "Mistral",
            attackStyle: "Magic",
            maxHit: 680
        },
        {
            name: "Ophidia",
            attackStyle: "Melee",
            maxHit: 699
        },
        {
            name: "Terran",
            attackStyle: "Melee",
            maxHit: 950
        },
        {
            name: "Fire Guard",
            attackStyle: "Melee",
            maxHit: 650
        },
        {
            name: "Fire Monster",
            attackStyle: "Melee",
            maxHit: 487
        },
        {
            name: "Fire Golem",
            attackStyle: "Magic",
            maxHit: 580
        },
        {
            name: "Pyra",
            attackStyle: "Magic",
            maxHit: 900
        },
        {
            name: "Ignis",
            attackStyle: "Melee",
            maxHit: 900
        },
        {
            name: "Ragnar",
            attackStyle: "Magic",
            maxHit: 1300
        },
        {
            name: "Skeleton",
            attackStyle: "Ranged",
            maxHit: 32
        },
        {
            name: "Leech",
            attackStyle: "Melee",
            maxHit: 42
        },
        {
            name: "Wandering Bard",
            attackStyle: "Magic",
            maxHit: 118
        }
    ]
};