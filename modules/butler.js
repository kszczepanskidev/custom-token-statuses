import { EnhancedConditions } from "./enhanced-conditions/enhanced-conditions.js";

export const NAME = "thanduls-custom-statuses";

export const TITLE = "Custom Token Statuses";

export const SHORTNAME = "cub";

export const PATH = "modules/thanduls-custom-statuses";

export const GADGETS = {
    enhancedConditions: {
        name: "Custom Token Statuses",
        info: "Provides the ability to customize Token Status Effect icons",
    }
}
/**
 * Stores information about well known game systems. All other systems will resolve to "other"
 * Keys must match id
 */
export const KNOWN_GAME_SYSTEMS = {
    dnd5e: {
        id: "dnd5e",
        name: "Dungeons & Dragons 5th Edition",
        concentrationAttribute: "con",
        healthAttribute: "attributes.hp",
        initiative: "attributes.initiative"
    },
    pf1: {
        id: "pf1",
        name: "Pathfinder",
        concentrationAttribute: "",
        healthAttribute: "attributes.hp",
        initiative: "attributes.init.total"
    },
    pf2e: {
        id: "pf2e",
        name: "Pathfinder 2nd Edition",
        concentrationAttribute: "",
        healthAttribute: "attributes.hp",
        initiative: "attributes.perception"
    },
    wfrp4e: {
        id: "wfrp4e",
        name: "Warhammer Fantasy Roleplaying Game 4th Edition",
        concentrationAttribute: "",
        healthAttribute: "status.wounds",
        initiative: "characteristics.i"
    },
    archmage: {
        id: "archmage",
        name: "13th Age",
        concentrationAttribute: "",
        healthAttribute: "attributes.hp",
        initiative: "attributes.init.mod"
    },
    ironclaw2e: {
        id: "ironclaw2e",
        name: "Ironclaw Second Edition",
        concentrationAttribute: "",
        healthAttribute: "",
        initiative: ""
    },
    "cyberpunk-red-core": {
        id: "cyberpunk-red-core",
        name: "Cyberpunk Red Core"
    },
    other: {
        id: "other",
        name: "Custom/Other",
        concentrationAttribute: "--Unknown--",
        healthAttribute: "--Unknown--",
        initiative: "--Unknown--"
    }
}

export const DEFAULT_CONFIG = {
    enhancedConditions: {
        iconPath: `${PATH}/icons/`,
        conditionMapsPath: `${PATH}/condition-maps`,
        outputChat: false,
        outputCombat: false,
        removeDefaultEffects: true,
        conditionLab: {
            id: "cub-condition-lab",
            title: "Condition Lab",
        },
        optionConfig: {
            id: "cub-enhanced-condition-option-config",
            title: "CUB Enhanced Condition - Option Config"
        },
        title: "Enhanced Conditions",
        mapTypes: {
            default: "System - Default",
            custom: "System - Custom",
            other: "Other/Imported"
        },
        referenceTypes: [
            {
                id: "journalEntry",
                name: "Journal",
                icon: `fas fa-book-open`
            },
            {
                id: "compendium.journalEntry",
                name: "Journal (C)",
                icon: `fas fa-atlas`
            },
            {
                id: "item",
                name: "Item",
                icon: `fas fa-suitcase`
            },
            {
                id: "compendium.item",
                name: "Item (C)",
                icon: `fas fa-suitcase`
            }
        ],
        templates: {
            conditionLab: `${PATH}/templates/condition-lab.hbs`,
            importDialog: `${PATH}/templates/import-conditions.html`,
            optionConfig: `${PATH}/templates/enhanced-condition-option-config.hbs`
        },
        specialStatusEffects: {
            blinded: {
                optionProperty: "blindToken"
            },
            invisible: {
                optionProperty: "markInvisible"
            }
        }
    }
}

export const FLAGS = {
    enhancedConditions: {
        conditionId: "conditionId",
        overlay: "overlay"
    }
}

export const SETTING_KEYS = {
    enhancedConditions: {
        enable: "enableEnhancedConditions",
        coreIcons: "coreStatusIcons",
        coreEffects: "coreStatusEffects",
        system: "activeSystem",
        map: "activeConditionMap",
        defaultMaps: "defaultConditionMaps",
        mapType: "conditionMapType",
        removeDefaultEffects: "removeDefaultEffects",
        outputChat: "conditionsOutputToChat",
        outputCombat: "conditionsOutputDuringCombat",
        suppressPreventativeSaveReminder: "conditionsSuppressPreventativeSaveReminder",
        showSortDirectionDialog: "showSortDirectionDialog",
        defaultSpecialStatusEffects: "defaultSpecialStatusEffects",
        specialStatusEffectMapping: "specialStatusEffectMapping"
    }
}

