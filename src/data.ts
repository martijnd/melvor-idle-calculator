export type Monster = {
    name: string;
    attackStyle: string;
    maxHit: number;
    image: string;
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
                "Miolite Sprig",
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
            image: 'black_knight.svg',
            maxHit: 42
        },
        {
            name: "Hill Giant",
            attackStyle: "Melee",
            image: 'hill_giant.svg',
            maxHit: 53
        },
        {
            name: "Giant Crab",
            attackStyle: "Melee",
            image: 'large_crab.svg',
            maxHit: 42
        },
        {
            name: "Tentacle",
            attackStyle: "Melee",
            image: 'tentacle.svg',
            maxHit: 34
        },
        {
            name: "Seagull",
            attackStyle: "Melee",
            image: 'seagull.svg',
            maxHit: 23
        },
        {
            name: "Confused Pirate",
            attackStyle: "Melee",
            image: 'pirate.svg',
            maxHit: 46
        },
        {
            name: "Frozen Archer",
            attackStyle: "Ranged",
            image: 'frozen_archer.svg',
            maxHit: 75
        },
        {
            name: "Mummy",
            attackStyle: "Melee",
            image: 'mummy.svg',
            maxHit: 49
        },
        {
            name: "Statue",
            attackStyle: "Melee",
            image: 'statue.svg',
            maxHit: 58
        },
        {
            name: "Wet Monster",
            attackStyle: "Melee",
            image: 'm12.svg',
            maxHit: 74
        },
        {
            name: "Moist Monster",
            attackStyle: "Melee",
            image: 'm13.svg',
            maxHit: 42
        },
        {
            name: "Sweaty Monster",
            attackStyle: "Melee",
            image: 'm14.svg',
            maxHit: 46
        },
        {
            name: "Many Eyed Monster",
            attackStyle: "Ranged",
            image: 'many_eyed_monster.svg',
            maxHit: 92
        },
        {
            name: "Lots of Eyes",
            attackStyle: "Melee",
            image: 'lots_of_eyes.svg',
            maxHit: 68
        },
        {
            name: "Fairy",
            attackStyle: "Magic",
            image: 'fairy.svg',
            maxHit: 170
        },
        {
            name: "Goo Monster",
            attackStyle: "Melee",
            image: 'goo_monster.svg',
            maxHit: 34
        },
        {
            name: "Green Goo Monster",
            attackStyle: "Melee",
            image: 'green_goo_monster.svg',
            maxHit: 42
        },
        {
            name: "Golbin",
            attackStyle: "Melee",
            image: 'goblin.svg',
            maxHit: 23
        },
        {
            name: "Ranged Golbin",
            attackStyle: "Ranged",
            image: 'goblin.svg',
            maxHit: 27
        },
        {
            name: "Chicken",
            attackStyle: "Melee",
            image: 'chicken.svg',
            maxHit: 11
        },
        {
            name: "Cow",
            attackStyle: "Melee",
            image: 'cow.svg',
            maxHit: 18
        },
        {
            name: "Junior Farmer",
            attackStyle: "Melee",
            image: 'junior_farmer.svg',
            maxHit: 27
        },
        {
            name: "Adult Farmer",
            attackStyle: "Melee",
            image: 'adult_farmer.svg',
            maxHit: 42
        },
        {
            name: "Master Farmer",
            attackStyle: "Melee",
            image: 'master_farmer.svg',
            maxHit: 67
        },
        {
            name: "Wizard",
            attackStyle: "Magic",
            image: 'wizard.svg',
            maxHit: 120
        },
        {
            name: "Steel Knight",
            attackStyle: "Melee",
            image: 'steel_knight.svg',
            maxHit: 32
        },
        {
            name: "Mithril Knight",
            attackStyle: "Melee",
            image: 'mithril_knight.svg',
            maxHit: 52
        },
        {
            name: "Bandit Trainee",
            attackStyle: "Ranged",
            image: 'bandit_trainee.svg',
            maxHit: 42
        },
        {
            name: "Bandit",
            attackStyle: "Ranged",
            image: 'bandit.svg',
            maxHit: 82
        },
        {
            name: "Plant",
            attackStyle: "Melee",
            image: 'plant.svg',
            maxHit: 11
        },
        {
            name: "Moss Giant",
            attackStyle: "Melee",
            image: 'moss_giant.svg',
            maxHit: 124
        },
        {
            name: "Frozen Mammoth",
            attackStyle: "Melee",
            image: 'frozen_mammoth.svg',
            maxHit: 142
        },
        {
            name: "Stone Snake",
            attackStyle: "Magic",
            image: 'stone_snake.svg',
            maxHit: 120
        },
        {
            name: "Undead Werewolf",
            attackStyle: "Melee",
            image: 'undead_wolf.svg',
            maxHit: 77
        },
        {
            name: "Vampire",
            attackStyle: "Ranged",
            image: 'vampire.svg',
            maxHit: 105
        },
        {
            name: "Strange Eyed Monster",
            attackStyle: "Melee",
            image: 'strange_eyed_monster.svg',
            maxHit: 87
        },
        {
            name: "Eyes",
            attackStyle: "Melee",
            image: 'eyes.svg',
            maxHit: 125
        },
        {
            name: "Valkyrie",
            attackStyle: "Melee",
            image: 'valkyrie.svg',
            maxHit: 116
        },
        {
            name: "Angel",
            attackStyle: "Magic",
            image: 'angel.svg',
            maxHit: 190
        },
        {
            name: "Holy Archer",
            attackStyle: "Ranged",
            image: 'holy_archer.svg',
            maxHit: 177
        },
        {
            name: "Purple Goo Monster",
            attackStyle: "Melee",
            image: 'purple_goo_monster.svg',
            maxHit: 63
        },
        {
            name: "Scattered Goo Monster",
            attackStyle: "Melee",
            image: 'scattered_goo_monster.svg',
            maxHit: 103
        },
        {
            name: "Green Dragon",
            attackStyle: "Melee",
            image: 'dragon_green.svg',
            maxHit: 143
        },
        {
            name: "Blue Dragon",
            attackStyle: "Melee",
            image: 'dragon_blue.svg',
            maxHit: 168
        },
        {
            name: "Adamant Knight",
            attackStyle: "Melee",
            image: 'adamant_knight.svg',
            maxHit: 118
        },
        {
            name: "Master Wizard",
            attackStyle: "Magic",
            image: 'master_wizard.svg',
            maxHit: 170
        },
        {
            name: "Druid",
            attackStyle: "Magic",
            image: 'druid.svg',
            maxHit: 81
        },
        {
            name: "Thief",
            attackStyle: "Ranged",
            image: 'thief.svg',
            maxHit: 117
        },
        {
            name: "Shaman",
            attackStyle: "Magic",
            image: 'shaman.svg',
            maxHit: 137
        },
        {
            name: "Turkul Riders",
            attackStyle: "Melee",
            image: 'turkul_riders.svg',
            maxHit: 82
        },
        {
            name: "Turkul Archers",
            attackStyle: "Ranged",
            image: 'turkul_archers.svg',
            maxHit: 112
        },
        {
            name: "Turkul Throwers",
            attackStyle: "Melee",
            image: 'turkul_throwers.svg',
            maxHit: 132
        },
        {
            name: "Fierce Devil",
            attackStyle: "Melee",
            image: 'fierce_devil.svg',
            maxHit: 128
        },
        {
            name: "Griffin",
            attackStyle: "Melee",
            image: 'griffin.svg',
            maxHit: 128
        },
        {
            name: "Pegasus",
            attackStyle: "Melee",
            image: 'pegasus.svg',
            maxHit: 264
        },
        {
            name: "Raging Horned Elite",
            attackStyle: "Melee",
            image: 'raging_horned_elite.svg',
            maxHit: 146
        },
        {
            name: "Seething Horned Elite",
            attackStyle: "Melee",
            image: 'seething_horned_elite.svg',
            maxHit: 243
        },
        {
            name: "Red Dragon",
            attackStyle: "Melee",
            image: 'dragon_red.svg',
            maxHit: 212
        },
        {
            name: "Black Dragon",
            attackStyle: "Melee",
            image: 'dragon_black.svg',
            maxHit: 268
        },
        {
            name: "Rune Knight",
            attackStyle: "Melee",
            image: 'rune_knight.svg',
            maxHit: 212
        },
        {
            name: "Turkul Giant",
            attackStyle: "Melee",
            image: 'turkul_giant.svg',
            maxHit: 192
        },
        {
            name: "Paladin",
            attackStyle: "Melee",
            image: 'paladin.svg',
            maxHit: 163
        },
        {
            name: "Dark Wizard",
            attackStyle: "Magic",
            image: 'dark_wizard.svg',
            maxHit: 210
        },
        {
            name: "Necromancer",
            attackStyle: "Magic",
            image: 'necromancer.svg',
            maxHit: 163
        },
        {
            name: "Elementalist",
            attackStyle: "Magic",
            image: 'elementalist.svg',
            maxHit: 240
        },
        {
            name: "Priest",
            attackStyle: "Magic",
            image: 'priest.svg',
            maxHit: 213
        },
        {
            name: "Turkul General",
            attackStyle: "Ranged",
            image: 'turkul_general.svg',
            maxHit: 202
        },
        {
            name: "Sand Beast",
            attackStyle: "Ranged",
            image: 'sand_beast.svg',
            maxHit: 260
        },
        {
            name: "Dark Horned Elite",
            attackStyle: "Melee",
            image: 'dark_horned_elite.svg',
            maxHit: 443
        },
        {
            name: "Bounty Hunter",
            attackStyle: "Melee",
            image: 'bounty_hunter.svg',
            maxHit: 329
        },
        {
            name: "Cursed Maiden",
            attackStyle: "Magic",
            image: 'cursed_maiden.svg',
            maxHit: 450
        },
        {
            name: "Furious Horned Elite",
            attackStyle: "Ranged",
            image: 'furious_horned_elite.svg',
            maxHit: 397
        },
        {
            name: "Rancora Spider",
            attackStyle: "Ranged",
            image: 'rancora_spider.svg',
            maxHit: 450
        },
        {
            name: "Elder Vampire",
            attackStyle: "Ranged",
            image: 'elder_vampire.svg',
            maxHit: 400
        },
        {
            name: "Chaotic Greater Dragon",
            attackStyle: "Melee",
            image: 'chaotic_greater_dragon.png',
            maxHit: 600
        },
        {
            name: "Umbora",
            attackStyle: "Melee",
            image: 'umbora.svg',
            maxHit: 930
        },
        {
            name: "Wicked Greater Dragon",
            attackStyle: "Magic",
            image: 'wicked_greater_dragon.png',
            maxHit: 240
        },
        {
            name: "Ku-tul",
            attackStyle: "Magic",
            image: 'ku-tul.svg',
            maxHit: 970
        },
        {
            name: "Hunting Greater Dragon",
            attackStyle: "Ranged",
            image: 'hunting_greater_dragon.png',
            maxHit: 600
        },
        {
            name: "Rokken",
            attackStyle: "Ranged",
            image: 'rokken.svg',
            maxHit: 1235
        },
        {
            name: "Chick",
            attackStyle: "Melee",
            image: 'chick.svg',
            maxHit: 10
        },
        {
            name: "Mumma Chicken",
            attackStyle: "Melee",
            image: 'mumma_chicken.svg',
            maxHit: 52
        },
        {
            name: "Zombie Hand",
            attackStyle: "Melee",
            image: 'zombie_hand.svg',
            maxHit: 42
        },
        {
            name: "Zombie",
            attackStyle: "Melee",
            image: 'zombie.svg',
            maxHit: 52
        },
        {
            name: "Ghost",
            attackStyle: "Melee",
            image: 'ghost.svg',
            maxHit: 62
        },
        {
            name: "Zombie Leader",
            attackStyle: "Melee",
            image: 'zombie_leader.svg',
            maxHit: 106
        },
        {
            name: "Bandit Leader",
            attackStyle: "Ranged",
            image: 'bandit.svg',
            maxHit: 174
        },
        {
            name: "Elder Wizard",
            attackStyle: "Magic",
            image: 'elder_wizard.svg',
            maxHit: 210
        },
        {
            name: "Spider (lv. 51)",
            attackStyle: "Melee",
            image: 'spider.svg',
            maxHit: 72
        },
        {
            name: "Spider (lv. 52)",
            attackStyle: "Melee",
            image: 'spider2.svg',
            maxHit: 72
        },
        {
            name: "Evil Spider",
            attackStyle: "Melee",
            image: 'spider_subboss.svg',
            maxHit: 102
        },
        {
            name: "Spider King",
            attackStyle: "Melee",
            image: 'spider_boss.svg',
            maxHit: 142
        },
        {
            name: "Miolite Sprig",
            attackStyle: "Melee",
            image: 'miolite_sprig.png',
            maxHit: 180
        },
        {
            name: "Miolite Trio",
            attackStyle: "Magic",
            image: 'miolite_trio.png',
            maxHit: 180
        },
        {
            name: "Miolite Warden",
            attackStyle: "Melee",
            image: 'miolite_warden.png',
            maxHit: 180
        },
        {
            name: "Miolite Monarch",
            attackStyle: "Magic",
            image: 'miolite_monarch.png',
            maxHit: 240
        },
        {
            name: "Pirate",
            attackStyle: "Melee",
            image: 'pirate.svg',
            maxHit: 84
        },
        {
            name: "First Mate",
            attackStyle: "Melee",
            image: 'first_mate.svg',
            maxHit: 131
        },
        {
            name: "Pirate Captain",
            attackStyle: "Melee",
            image: 'pirate_captain.svg',
            maxHit: 177
        },
        {
            name: "The Kraken",
            attackStyle: "Melee",
            image: 'kraken.svg',
            maxHit: 204
        },
        {
            name: "Ice Monster",
            attackStyle: "Melee",
            image: 'ice_monster.svg',
            maxHit: 92
        },
        {
            name: "Ice Troll",
            attackStyle: "Melee",
            image: 'ice_troll.svg',
            maxHit: 102
        },
        {
            name: "Ice",
            attackStyle: "Melee",
            image: 'ice.svg',
            maxHit: 102
        },
        {
            name: "Protector of Ice",
            attackStyle: "Melee",
            image: 'ice_king.svg',
            maxHit: 172
        },
        {
            name: "Elder Dragon",
            attackStyle: "Melee",
            image: 'elder_dragon.svg',
            maxHit: 470
        },
        {
            name: "Bat",
            attackStyle: "Melee",
            image: 'bat.svg',
            maxHit: 52
        },
        {
            name: "Big Bat",
            attackStyle: "Melee",
            image: 'bat_big.svg',
            maxHit: 82
        },
        {
            name: "The Eye",
            attackStyle: "Magic",
            image: 'eye.svg',
            maxHit: 140
        },
        {
            name: "The Resurrected Eye",
            attackStyle: "Magic",
            image: 'eye_resurrected.svg',
            maxHit: 240
        },
        {
            name: "Vicious Serpent",
            attackStyle: "Ranged",
            image: 'viscous_serpent.svg',
            maxHit: 282
        },
        {
            name: "Fire Spirit",
            attackStyle: "Magic",
            image: 'fire_spirit.svg',
            maxHit: 340
        },
        {
            name: "Prat, the Protector of Secrets",
            attackStyle: "Ranged",
            image: 'prat_protector_of_secrets.svg',
            maxHit: 501
        },
        {
            name: "Malcs, the Guardian of Melvor",
            attackStyle: "Melee",
            image: 'malcs_guardian_of_melvor.svg',
            maxHit: 520
        },
        {
            name: "Cerberus",
            attackStyle: "Melee",
            image: 'cerberus.svg',
            maxHit: 162
        },
        {
            name: "Fearful Eye",
            attackStyle: "Magic",
            image: 'fearful_eye.svg',
            maxHit: 236
        },
        {
            name: "Red Devil",
            attackStyle: "Melee",
            image: 'red_devil.svg',
            maxHit: 314
        },
        {
            name: "Phoenix",
            attackStyle: "Magic",
            image: 'phoenix.svg',
            maxHit: 371
        },
        {
            name: "Incendius",
            attackStyle: "Melee",
            image: 'incendius.svg',
            maxHit: 433
        },
        {
            name: "Prat, the Guardian of Secrets",
            attackStyle: "Ranged",
            image: 'prat_leader.svg',
            maxHit: 522
        },
        {
            name: "Malcs, the Leader of Dragons",
            attackStyle: "Melee",
            image: 'malcs_leader.svg',
            maxHit: 750
        },
        {
            name: "Air Guard",
            attackStyle: "Ranged",
            image: 'air_guard.svg',
            maxHit: 340
        },
        {
            name: "Air Monster",
            attackStyle: "Melee",
            image: 'air_monster.svg',
            maxHit: 441
        },
        {
            name: "Air Golem",
            attackStyle: "Ranged",
            image: 'air_golem.svg',
            maxHit: 650
        },
        {
            name: "Aleron",
            attackStyle: "Melee",
            image: 'air_guardian2.svg',
            maxHit: 699
        },
        {
            name: "Voltaire",
            attackStyle: "Ranged",
            image: 'air_guardian1.svg',
            maxHit: 713
        },
        {
            name: "Aeris",
            attackStyle: "Ranged",
            image: 'aeris.svg',
            maxHit: 650
        },
        {
            name: "Water Guard",
            attackStyle: "Magic",
            image: 'water_guard.svg',
            maxHit: 370
        },
        {
            name: "Water Monster",
            attackStyle: "Melee",
            image: 'water_monster.svg',
            maxHit: 650
        },
        {
            name: "Water Golem",
            attackStyle: "Magic",
            image: 'water_golem.svg',
            maxHit: 845
        },
        {
            name: "Lissia",
            attackStyle: "Magic",
            image: 'water_guardian1.svg',
            maxHit: 720
        },
        {
            name: "Murtia",
            attackStyle: "Melee",
            image: 'water_guardian2.svg',
            maxHit: 733
        },
        {
            name: "Glacia",
            attackStyle: "Magic",
            image: 'glacia.svg',
            maxHit: 1080
        },
        {
            name: "Earth Guard",
            attackStyle: "Ranged",
            image: 'earth_guard.svg',
            maxHit: 320
        },
        {
            name: "Earth Monster",
            attackStyle: "Melee",
            image: 'earth_monster.svg',
            maxHit: 650
        },
        {
            name: "Earth Golem",
            attackStyle: "Melee",
            image: 'earth_golem.svg',
            maxHit: 850
        },
        {
            name: "Mistral",
            attackStyle: "Magic",
            image: 'earth_guardian1.svg',
            maxHit: 680
        },
        {
            name: "Ophidia",
            attackStyle: "Melee",
            image: 'earth_guardian2.svg',
            maxHit: 699
        },
        {
            name: "Terran",
            attackStyle: "Melee",
            image: 'terran.svg',
            maxHit: 950
        },
        {
            name: "Fire Guard",
            attackStyle: "Melee",
            image: 'fire_guard.svg',
            maxHit: 650
        },
        {
            name: "Fire Monster",
            attackStyle: "Melee",
            image: 'fire_monster.svg',
            maxHit: 487
        },
        {
            name: "Fire Golem",
            attackStyle: "Magic",
            image: 'fire_golem.svg',
            maxHit: 580
        },
        {
            name: "Pyra",
            attackStyle: "Magic",
            image: 'fire_guardian1.svg',
            maxHit: 900
        },
        {
            name: "Ignis",
            attackStyle: "Melee",
            image: 'fire_guardian2.svg',
            maxHit: 900
        },
        {
            name: "Ragnar",
            attackStyle: "Magic",
            image: 'ragnar.svg',
            maxHit: 1300
        },
        {
            name: "Skeleton",
            attackStyle: "Ranged",
            image: 'skeleton.svg',
            maxHit: 32
        },
        {
            name: "Leech",
            attackStyle: "Melee",
            image: 'leech.svg',
            maxHit: 42
        },
        {
            name: "Wandering Bard",
            attackStyle: "Magic",
            image: 'wandering_bard.svg',
            maxHit: 118
        }
    ]
};