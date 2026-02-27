<template>
  <div
    class="min-h-screen text-white bg-[radial-gradient(ellipse_at_top,var(--color-dark-light)_0%,var(--color-dark)_70%)]"
  >
    <div class="relative flex-1 max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1
          class="text-3xl font-bold tracking-tight sm:text-4xl bg-linear-to-r from-white to-muted-light bg-clip-text text-transparent"
        >
          Melvor Idle Calculator
        </h1>
        <p class="mt-2 text-sm text-muted">
          Damage reduction & idle threshold calculator
        </p>
      </header>

      <!-- Sticky controls panel -->
      <div
        class="sticky top-0 z-10 mb-6 -mx-4 px-4 pt-3 pb-1 sm:-mx-6 sm:px-6 rounded-xl bg-dark/80 backdrop-blur-xl border border-border/50"
      >
        <!-- Character section (collapsible) -->
        <div class="border-b border-border/50">
          <button
            type="button"
            class="flex w-full items-center justify-between p-3 mb-2 rounded text-left"
            @click="
              state.charactersSectionVisible = !state.charactersSectionVisible
            "
          >
            <span class="text-sm font-medium text-muted-light">
              <span class="font-semibold text-white">{{
                activeCharacter.name || "Unnamed"
              }}</span>
            </span>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              :class="[
                'text-muted transition-transform',
                state.charactersSectionVisible ? 'rotate-180' : '',
              ]"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              />
            </svg>
          </button>
          <div
            v-show="state.charactersSectionVisible"
            class="space-y-4 pb-4 pt-1"
          >
            <div class="space-y-2">
              <span class="block text-sm font-medium text-muted-light"
                >Characters</span
              >
              <ul
                class="flex flex-col gap-1 max-h-40 overflow-y-auto rounded-lg border border-border/50 bg-dark-lighter/50 p-1"
              >
                <li
                  v-for="char of state.characters"
                  :key="char.id"
                  class="flex items-center gap-2"
                >
                  <template v-if="editingCharacterId === char.id">
                    <input
                      ref="inlineEditInputRef"
                      v-model="editingCharacterName"
                      type="text"
                      class="flex-1 min-w-0 rounded-md border border-accent/50 bg-dark-lighter px-3 py-2.5 text-sm text-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                      placeholder="Character name"
                      @keydown.enter="saveInlineEdit"
                      @keydown.escape="cancelInlineEdit"
                    />
                    <button
                      type="button"
                      class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-success hover:border-success/30 hover:bg-success/20 transition-colors"
                      title="Save"
                      aria-label="Save"
                      @click.stop="saveInlineEdit"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-light transition-colors hover:border-border hover:bg-dark-lighter hover:text-white"
                      title="Cancel"
                      aria-label="Cancel"
                      @click.stop="cancelInlineEdit"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </template>
                  <template v-else>
                    <button
                      type="button"
                      :class="[
                        'flex flex-1 min-w-0 items-center rounded-md px-3 py-2.5 text-left text-sm transition-colors',
                        state.activeCharacterId === char.id
                          ? 'bg-accent/20 text-accent border border-accent/40'
                          : 'text-muted-light hover:bg-dark-lighter hover:text-white border border-transparent',
                      ]"
                      @click="state.activeCharacterId = char.id"
                    >
                      <span class="truncate">
                        {{ char.name || "Unnamed" }}
                      </span>
                    </button>
                    <button
                      type="button"
                      class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-light transition-colors hover:border-border hover:bg-dark-lighter hover:text-white"
                      title="Edit"
                      aria-label="Edit character"
                      @click.stop="openInlineEdit(char)"
                    >
                      <svg
                        class="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        />
                      </svg>
                    </button>
                  </template>
                  <button
                    v-if="editingCharacterId !== char.id"
                    type="button"
                    class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-light transition-colors hover:border-border hover:bg-dark-lighter hover:text-white"
                    title="Duplicate"
                    aria-label="Duplicate character"
                    @click.stop="duplicateCharacter(char)"
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="editingCharacterId !== char.id"
                    type="button"
                    :disabled="state.characters.length <= 1"
                    :class="[
                      'inline-flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      state.characters.length <= 1
                        ? 'cursor-not-allowed border-transparent text-muted'
                        : 'border-transparent text-muted-light hover:border-danger/30 hover:bg-danger-dim/50 hover:text-danger',
                    ]"
                    title="Delete"
                    aria-label="Delete character"
                    @click.stop="
                      characterToDeleteId = char.id;
                      showDeleteConfirmModal = true;
                    "
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path
                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-medium rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                @click="showAddCharacterModal = true"
              >
                Add character
              </button>
            </div>
          </div>
        </div>
        <div v-if="state.inputsVisible">
          <div
            class="grid grid-cols-2 gap-4 py-4 sm:grid-cols-5 sm:grid-rows-2"
          >
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Total Health</span
              >
              <input
                id="totalHealth"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                :step="activeCharacter.mode === 'Normal' ? 10 : 100"
                min="0"
                v-model="activeCharacter.totalHealth"
              />
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Current DR (%)</span
              >
              <input
                id="currentDR"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                step="1"
                min="0"
                max="100"
                v-model="activeCharacter.currentDR"
              />
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Auto Eat</span
              >
              <select
                id="autoEatLevel"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.autoEatLevel"
              >
                <option v-for="value of [1, 2, 3]" :value="value">
                  Level {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Combat Style</span
              >
              <select
                id="combatStyle"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.combatStyle"
              >
                <option
                  v-for="value of ['Melee', 'Ranged', 'Magic']"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Wasteful Ring</span
              >
              <select
                id="wastefulRing"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.wastefulRing"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Guardian Am.</span
              >
              <select
                id="guardianAmulet"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.guardianAmulet"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Mode</span
              >
              <select
                id="mode"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.mode"
              >
                <option v-for="value of ['Normal', 'Adventure']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Yak Synergy</span
              >
              <select
                id="yakSynergy"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.yakSynergy"
              >
                <option
                  v-for="value of ['None', 'Minotaur', 'Centaur', 'Witch']"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Stun Damage</span
              >
              <select
                id="stunDamage"
                class="w-full h-11 px-4 py-2 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none cursor-pointer"
                v-model="activeCharacter.stunDamage"
              >
                <option v-for="value of ['Yes', 'No']" :value="value">
                  {{ value }}
                </option>
              </select>
            </label>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Slayer Negation (%)</span
              >
              <input
                id="slayerAreaNegation"
                class="w-full px-4 py-2.5 text-white transition-all rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                type="number"
                step="1"
                min="0"
                max="150"
                v-model="activeCharacter.slayerAreaNegation"
              />
            </label>
            <div class="flex flex-col gap-2 sm:col-span-2">
              <span class="block text-sm font-medium text-muted-light"
                >Owned Expansions</span
              >
              <div class="flex gap-3 flex-nowrap">
                <button
                  type="button"
                  role="checkbox"
                  :aria-checked="state.ownedExpansions.totH"
                  :class="[
                    'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200',
                    state.ownedExpansions.totH
                      ? 'bg-expansion-toth-dim border-expansion-toth/50 text-white shadow-sm'
                      : 'bg-dark-lighter/60 border-border/60 text-muted hover:border-border hover:text-muted-light',
                  ]"
                  @click="
                    state.ownedExpansions.totH = !state.ownedExpansions.totH
                  "
                >
                  <span
                    :class="[
                      'w-2.5 h-2.5 rounded-full shrink-0 transition-colors',
                      state.ownedExpansions.totH
                        ? 'bg-expansion-toth'
                        : 'bg-border',
                    ]"
                  />
                  <span class="text-sm font-medium whitespace-nowrap"
                    >Throne of the Herald</span
                  >
                </button>
                <button
                  type="button"
                  role="checkbox"
                  :aria-checked="state.ownedExpansions.aoD"
                  :class="[
                    'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200',
                    state.ownedExpansions.aoD
                      ? 'bg-expansion-aod-dim border-expansion-aod/50 text-white shadow-sm'
                      : 'bg-dark-lighter/60 border-border/60 text-muted hover:border-border hover:text-muted-light',
                  ]"
                  @click="
                    state.ownedExpansions.aoD = !state.ownedExpansions.aoD
                  "
                >
                  <span
                    :class="[
                      'w-2.5 h-2.5 rounded-full shrink-0 transition-colors',
                      state.ownedExpansions.aoD
                        ? 'bg-expansion-aod'
                        : 'bg-border',
                    ]"
                  />
                  <span class="text-sm font-medium whitespace-nowrap"
                    >Atlas of Discovery</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-between pt-2 pb-1 border-t border-border/50"
        >
          <span class="text-sm text-muted">
            Auto Eat Threshold:
            <span class="font-semibold text-success"
              >{{
                Math.floor(
                  getAutoEatThreshold(dataForCalculations) *
                    dataForCalculations.totalHealth,
                )
              }}
              HP</span
            >
          </span>
          <button
            :class="`p-2 rounded-lg transition-all hover:bg-dark-lighter ${state.inputsVisible ? 'rotate-180' : ''}`"
            @click="state.inputsVisible = !state.inputsVisible"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              class="text-muted hover:text-white transition-colors"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.25 10.75L12 14.25L8.75 10.75"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main content card -->
      <div
        class="overflow-hidden rounded-2xl border border-border/50 bg-dark-light/50 backdrop-blur-sm shadow-xl shadow-black/20"
      >
        <!-- Tabs -->
        <div class="flex border-b border-border/50 bg-dark-lighter/30">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'flex-1 px-4 py-3.5 text-sm font-medium transition-all',
              state.activeTab === tab.id
                ? 'text-accent border-b-2 border-accent bg-dark-light/50'
                : 'text-muted hover:text-white hover:bg-dark-lighter/50',
            ]"
            @click="state.activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab panels -->
        <div class="p-4 sm:p-6">
          <div v-if="state.activeTab === 'monsters'" class="space-y-4">
            <h2 class="text-lg font-semibold">Monsters</h2>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th
                      class="px-4 py-3 text-left text-sm font-medium text-muted"
                    >
                      Name
                    </th>
                    <th
                      class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell"
                    >
                      Attack style
                    </th>
                    <th
                      class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell"
                    >
                      Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      Reduced Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      DR needed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent
                    :monsters="filteredMonsters"
                    :data="dataForCalculations"
                    :number-multiplier="numberMultiplier"
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="state.activeTab === 'dungeons'" class="space-y-4">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 class="flex items-center gap-2 text-lg font-semibold">
                Dungeons
                <IdleStatusIcon :idleable="canIdleDungeon" />
              </h2>
              <select
                id="dungeon"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="state.dungeonChoice"
              >
                <option
                  v-for="dungeon of filteredDungeons"
                  :value="dungeon.name"
                >
                  {{ dungeon.name }}
                </option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th
                      class="px-4 py-3 text-left text-sm font-medium text-muted"
                    >
                      Name
                    </th>
                    <th
                      class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell"
                    >
                      Attack style
                    </th>
                    <th
                      class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell"
                    >
                      Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      Reduced Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      DR needed (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent
                    :monsters="dungeonChoiceMonsters"
                    :data="dataForCalculations"
                    :number-multiplier="numberMultiplier"
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="state.activeTab === 'slayer'" class="space-y-4">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 class="flex items-center gap-2 text-lg font-semibold">
                Slayer
                <IdleStatusIcon :idleable="canIdleSlayerTier" />
              </h2>
              <select
                id="slayer"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="state.slayerTier"
              >
                <option v-for="tier of slayerTiers" :value="tier.name">
                  {{ tier.name }}
                </option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th
                      class="px-4 py-3 text-left text-sm font-medium text-muted"
                    >
                      Name
                    </th>
                    <th
                      class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell"
                    >
                      Attack style
                    </th>
                    <th
                      class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell"
                    >
                      Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      Reduced Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      DR needed (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent
                    :monsters="slayerTierMonsters"
                    :data="dataForCalculations"
                    :number-multiplier="numberMultiplier"
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="state.activeTab === 'slayerAreas'" class="space-y-4">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 class="text-lg font-semibold">Slayer Areas</h2>
              <select
                id="slayerAreas"
                class="px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:outline-none cursor-pointer max-w-xs"
                v-model="state.slayerArea"
              >
                <option v-for="area of filteredSlayerAreas" :value="area.name">
                  {{ area.name }}
                </option>
              </select>
            </div>
            <div class="overflow-x-auto rounded-xl border border-border/50">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border/50 bg-dark-lighter/30">
                    <th
                      class="px-4 py-3 text-left text-sm font-medium text-muted"
                    >
                      Name
                    </th>
                    <th
                      class="hidden px-4 py-3 text-left text-sm font-medium text-muted md:table-cell"
                    >
                      Attack style
                    </th>
                    <th
                      class="hidden px-4 py-3 text-right text-sm font-medium text-muted tabular-nums md:table-cell"
                    >
                      Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      Reduced Max hit
                    </th>
                    <th
                      class="px-4 py-3 text-right text-sm font-medium text-muted tabular-nums"
                    >
                      DR needed (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableContent
                    :monsters="slayerAreaMonsters"
                    :data="dataForCalculations"
                    :number-multiplier="numberMultiplier"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add character modal -->
    <Teleport to="body">
      <div
        v-show="showAddCharacterModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeAddCharacterModal"
      >
        <div
          class="w-full max-w-md rounded-xl border border-border/50 bg-dark-light shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-character-title"
        >
          <div class="p-6 space-y-4">
            <h2
              id="add-character-title"
              class="text-lg font-semibold text-white"
            >
              Add character
            </h2>
            <label class="block">
              <span class="block mb-2 text-sm font-medium text-muted-light"
                >Character name</span
              >
              <input
                ref="addCharacterNameInput"
                v-model="newCharacterName"
                type="text"
                class="w-full px-4 py-2.5 text-white rounded-lg bg-dark-lighter border border-border hover:border-border-hover focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                placeholder="e.g. Main, Alt, Hardcore"
                autocomplete="off"
                @keydown.enter="confirmAddCharacter"
              />
            </label>
            <div class="flex justify-end gap-2 pt-2">
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-medium rounded-lg bg-dark-lighter text-muted-light hover:bg-dark-lighter/80 hover:text-white border border-border transition-colors"
                @click="closeAddCharacterModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-medium rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                @click="confirmAddCharacter"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Delete character confirmation modal -->
    <Teleport to="body">
      <div
        v-show="showDeleteConfirmModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeDeleteConfirmModal"
      >
        <div
          class="w-full max-w-md rounded-xl border border-border/50 bg-dark-light shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-character-title"
        >
          <div class="p-6 space-y-4">
            <h2
              id="delete-character-title"
              class="text-lg font-semibold text-white"
            >
              Delete character
            </h2>
            <p class="text-muted-light">
              Are you sure you want to delete
              <span class="font-medium text-white">{{
                characterToDelete?.name || "Unnamed"
              }}</span
              >? This cannot be undone.
            </p>
            <div class="flex justify-end gap-2 pt-2">
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-medium rounded-lg bg-dark-lighter text-muted-light hover:bg-dark-lighter/80 hover:text-white border border-border transition-colors"
                @click="closeDeleteConfirmModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2.5 text-sm font-medium rounded-lg bg-danger-dim/50 text-danger hover:bg-danger-dim border border-danger/30 transition-colors"
                @click="confirmDeleteCharacter"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import {
  dungeons,
  monsters,
  slayerTiers,
  slayerAreas,
  type Monster,
} from "./data";
import {
  getAttacks,
  getIsIdleable,
  getMaxHit,
  getMinimumDR,
  getReducedMaxHit,
  getAutoEatThreshold,
  monsterMatchesOwnedExpansions,
} from "./utils";
import {
  type AppState,
  type Character,
  type Data,
  createDefaultCharacter,
} from "./types";
import TableContent from "./components/TableContent.vue";
import IdleStatusIcon from "./components/IdleStatusIcon.vue";

const tabs = [
  { id: "monsters" as const, label: "Monsters" },
  { id: "dungeons" as const, label: "Dungeons" },
  { id: "slayerAreas" as const, label: "Slayer Areas" },
  { id: "slayer" as const, label: "Slayer" },
];

const defaultCharacter = createDefaultCharacter("Character 1");

const showAddCharacterModal = ref(false);
const showDeleteConfirmModal = ref(false);
const characterToDeleteId = ref<string | null>(null);
const newCharacterName = ref("");
const addCharacterNameInput = ref<HTMLInputElement | null>(null);
const editingCharacterName = ref("");
const editingCharacterId = ref<string | null>(null);
const inlineEditInputRef = ref<HTMLInputElement | HTMLInputElement[] | null>(
  null,
);

const state = reactive<AppState>({
  characters: [defaultCharacter],
  activeCharacterId: defaultCharacter.id,
  charactersSectionVisible: true,
  slayerArea: "Penumbra",
  slayerTier: "Easy",
  dungeonChoice: "Chicken Coop",
  activeTab: "monsters",
  inputsVisible: true,
  ownedExpansions: { totH: true, aoD: true },
});

onMounted(() => {
  const raw = localStorage["data"];
  if (!raw) return;
  const stored = JSON.parse(raw) as Partial<AppState> & Partial<Data>;
  if (stored.characters?.length) {
    state.characters = stored.characters;
    const validId =
      stored.activeCharacterId &&
      stored.characters.some((c) => c.id === stored.activeCharacterId)
        ? stored.activeCharacterId
        : stored.characters[0].id;
    state.activeCharacterId = validId;
    state.charactersSectionVisible = stored.charactersSectionVisible ?? true;
    state.slayerArea = stored.slayerArea ?? "Penumbra";
    state.slayerTier = stored.slayerTier ?? "Easy";
    state.dungeonChoice = stored.dungeonChoice ?? "Chicken Coop";
    state.activeTab = stored.activeTab ?? "monsters";
    state.inputsVisible = stored.inputsVisible ?? true;
    state.ownedExpansions = stored.ownedExpansions ?? {
      totH: true,
      aoD: true,
    };
  } else {
    const char = createDefaultCharacter("Character 1");
    char.mode = (stored.mode as Character["mode"]) ?? "Normal";
    char.totalHealth = stored.totalHealth ?? 600;
    char.currentDR = stored.currentDR ?? 20;
    char.autoEatLevel = (stored.autoEatLevel as Character["autoEatLevel"]) ?? 1;
    char.combatStyle =
      (stored.combatStyle as Character["combatStyle"]) ?? "Melee";
    char.wastefulRing =
      (stored.wastefulRing as Character["wastefulRing"]) ?? "No";
    char.guardianAmulet =
      (stored.guardianAmulet as Character["guardianAmulet"]) ?? "No";
    char.yakSynergy = (stored.yakSynergy as Character["yakSynergy"]) ?? "None";
    char.stunDamage = (stored.stunDamage as Character["stunDamage"]) ?? "Yes";
    char.slayerAreaNegation = stored.slayerAreaNegation ?? 0;
    state.characters = [char];
    state.activeCharacterId = char.id;
    state.charactersSectionVisible = stored.charactersSectionVisible ?? true;
    state.slayerArea = stored.slayerArea ?? "Penumbra";
    state.slayerTier = stored.slayerTier ?? "Easy";
    state.dungeonChoice = stored.dungeonChoice ?? "Chicken Coop";
    state.activeTab = stored.activeTab ?? "monsters";
    state.inputsVisible = stored.inputsVisible ?? true;
    state.ownedExpansions = stored.ownedExpansions ?? {
      totH: true,
      aoD: true,
    };
  }
});

const activeCharacter = computed(
  () =>
    state.characters.find((c) => c.id === state.activeCharacterId) ??
    state.characters[0],
);

const characterToDelete = computed(() =>
  characterToDeleteId.value
    ? (state.characters.find((c) => c.id === characterToDeleteId.value) ?? null)
    : null,
);

watch(
  () => state.activeCharacterId,
  (newId, oldId) => {
    if (oldId !== undefined && editingCharacterId.value === oldId) {
      const oldChar = state.characters.find((c) => c.id === oldId);
      if (oldChar) oldChar.name = editingCharacterName.value;
      editingCharacterId.value = null;
    }
  },
);

async function openInlineEdit(char: Character) {
  editingCharacterId.value = char.id;
  editingCharacterName.value = char.name ?? "";
  await nextTick();
  const el = Array.isArray(inlineEditInputRef.value)
    ? inlineEditInputRef.value[0]
    : inlineEditInputRef.value;
  el?.focus();
}

function saveInlineEdit() {
  if (!editingCharacterId.value) return;
  const char = state.characters.find((c) => c.id === editingCharacterId.value);
  if (char) char.name = editingCharacterName.value;
  editingCharacterId.value = null;
}

function cancelInlineEdit() {
  editingCharacterId.value = null;
}

const dataForCalculations = computed((): Data => {
  const char = activeCharacter.value;
  return {
    ...char,
    slayerArea: state.slayerArea,
    slayerTier: state.slayerTier,
    dungeonChoice: state.dungeonChoice,
    activeTab: state.activeTab,
    inputsVisible: state.inputsVisible,
    ownedExpansions: state.ownedExpansions,
  };
});

function closeAddCharacterModal() {
  showAddCharacterModal.value = false;
  newCharacterName.value = "";
}

watch(showAddCharacterModal, async (visible) => {
  if (visible) {
    newCharacterName.value = "";
    await nextTick();
    addCharacterNameInput.value?.focus();
  }
});

function confirmAddCharacter() {
  const name = newCharacterName.value.trim() || "New Character";
  const char = createDefaultCharacter(name);
  state.characters.push(char);
  state.activeCharacterId = char.id;
  closeAddCharacterModal();
}

function closeDeleteConfirmModal() {
  showDeleteConfirmModal.value = false;
  characterToDeleteId.value = null;
}

function confirmDeleteCharacter() {
  if (characterToDeleteId.value) {
    deleteCharacter(characterToDeleteId.value);
  }
  closeDeleteConfirmModal();
}

function deleteCharacter(id: string) {
  if (state.characters.length <= 1) return;
  const idx = state.characters.findIndex((c) => c.id === id);
  if (idx === -1) return;
  state.characters.splice(idx, 1);
  if (state.activeCharacterId === id) {
    state.activeCharacterId =
      state.characters[Math.min(idx, state.characters.length - 1)].id;
  }
}

function duplicateCharacter(char: Character) {
  const copy: Character = {
    ...char,
    id: crypto.randomUUID(),
    name: `${char.name || "Unnamed"} (copy)`,
  };
  state.characters.push(copy);
  state.activeCharacterId = copy.id;
}

function filterMonstersByExpansion(monsterNames: readonly string[]): Monster[] {
  return monsterNames
    .map(getMonster)
    .filter((m) => monsterMatchesOwnedExpansions(m, state.ownedExpansions));
}

const filteredMonsters = computed(() =>
  monsters.filter((m) =>
    monsterMatchesOwnedExpansions(m, state.ownedExpansions),
  ),
);

const filteredDungeons = computed(() =>
  dungeons.filter((dungeon) =>
    dungeon.monsters.some((name) =>
      monsterMatchesOwnedExpansions(getMonster(name), state.ownedExpansions),
    ),
  ),
);

const filteredSlayerAreas = computed(() =>
  slayerAreas.filter((area) =>
    area.monsters.some((name) =>
      monsterMatchesOwnedExpansions(getMonster(name), state.ownedExpansions),
    ),
  ),
);

const dungeonChoiceMonsters = computed(() => {
  const dungeon = dungeons.find((d) => d.name === state.dungeonChoice);
  if (!dungeon) return [];
  return filterMonstersByExpansion(dungeon.monsters);
});

const slayerTierMonsters = computed(() => {
  const tier = slayerTiers.find((t) => t.name === state.slayerTier);
  if (!tier) return [];
  return filterMonstersByExpansion(tier.monsters);
});

const slayerAreaMonsters = computed(() => {
  const area = slayerAreas.find((a) => a.name === state.slayerArea);
  if (!area) return [];
  return filterMonstersByExpansion(area.monsters);
});

function getMonster(monsterString: string) {
  return (
    monsters.find((monster) => monster.name === monsterString) ?? monsters[0]
  );
}

const canIdleDungeon = computed(() => {
  if (!dungeonChoiceMonsters.value) return false;
  const data = dataForCalculations.value;
  return dungeonChoiceMonsters.value.every((monster) =>
    getIsIdleable(
      getReducedMaxHit(
        getAttacks(monster, false, numberMultiplier.value, data),
      ),
      data,
    ),
  );
});

const canIdleSlayerTier = computed(() => {
  if (!slayerTierMonsters.value) return false;
  const data = dataForCalculations.value;
  return slayerTierMonsters.value.every((monster) =>
    getIsIdleable(
      getReducedMaxHit(
        getAttacks(monster, false, numberMultiplier.value, data),
      ),
      data,
    ),
  );
});

const numberMultiplier = computed(() =>
  dataForCalculations.value.mode === "Adventure" ? 100 : 10,
);

watch(
  state,
  (s) => {
    localStorage["data"] = JSON.stringify(s);
  },
  { deep: true },
);

watch(
  () => [state.ownedExpansions.totH, state.ownedExpansions.aoD] as const,
  () => {
    const validDungeons = dungeons.filter((d) =>
      d.monsters.some((name) =>
        monsterMatchesOwnedExpansions(getMonster(name), state.ownedExpansions),
      ),
    );
    if (!validDungeons.some((d) => d.name === state.dungeonChoice)) {
      state.dungeonChoice = validDungeons[0]?.name ?? state.dungeonChoice;
    }
    const validAreas = slayerAreas.filter((a) =>
      a.monsters.some((name) =>
        monsterMatchesOwnedExpansions(getMonster(name), state.ownedExpansions),
      ),
    );
    if (!validAreas.some((a) => a.name === state.slayerArea)) {
      state.slayerArea = validAreas[0]?.name ?? state.slayerArea;
    }
  },
  { immediate: true },
);
</script>
