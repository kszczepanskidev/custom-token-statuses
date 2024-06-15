/* -------------------------------------------- */
/*                    Imports                   */
/* -------------------------------------------- */
import * as BUTLER from "./butler.js";
import { Sidekick } from "./sidekick.js";
import { registerSettings } from "./settings.js";

import { EnhancedConditions } from "./enhanced-conditions/enhanced-conditions.js";

import { ConditionLab } from "./enhanced-conditions/condition-lab.js";

/* -------------------------------------------- */
/*                     Class                    */
/* -------------------------------------------- */

/**
 * Initiates module classes (and shines a light on the dark night sky)
 */
export class Signal {
    /**
     * Registers hooks
     */
    static lightUp() {

        /* -------------------------------------------- */
        /*                    System                    */
        /* -------------------------------------------- */

        /* ------------------- Init/Ready ------------------- */

        Hooks.on("init", () => {
            // Assign the namespace Object if it already exists or instantiate it as an object if not
            game.cub = game.cub ?? {};
            ui.cub = ui.cub ?? {};

            // Execute housekeeping
            Sidekick.handlebarsHelpers();
            Sidekick.jQueryHelpers();
            Sidekick.loadTemplates();
            registerSettings();

            // Instantiate gadget classes
            game.cub.enhancedConditions = new EnhancedConditions();

            // Expose API methods
            game.cub.getCondition = EnhancedConditions.getCondition;
            game.cub.getConditions = EnhancedConditions.getConditions;
            game.cub.getConditionEffects = EnhancedConditions.getConditionEffects;
            game.cub.hasCondition = EnhancedConditions.hasCondition;
            game.cub.applyCondition = EnhancedConditions.applyCondition;
            game.cub.addCondition = EnhancedConditions.addCondition;
            game.cub.removeCondition = EnhancedConditions.removeCondition;
            game.cub.removeAllConditions = EnhancedConditions.removeAllConditions;

        });

        Hooks.on("canvasInit", () => {});

        Hooks.on("ready", () => {
            EnhancedConditions._onReady();
        });

        /* -------------------------------------------- */
        /*                    Entity                    */
        /* -------------------------------------------- */

        /* ------------------- Actor ------------------ */

        Hooks.on("createActiveEffect", (effect, options, userId) => {
            EnhancedConditions._onCreateActiveEffect(effect, options, userId);
        });

        Hooks.on("deleteActiveEffect", (effect, options, userId) => {
            EnhancedConditions._onDeleteActiveEffect(effect, options, userId);
        });

        /* ------------------- Token ------------------ */

        Hooks.on("preUpdateToken", (tokenDocument, updateData, options, userId) => {
            EnhancedConditions._onPreUpdateToken(tokenDocument, updateData, options, userId);
        });

        Hooks.on("updateToken", (tokenDocument, updateData, options, userId) => {
            EnhancedConditions._onUpdateToken(tokenDocument, updateData, options, userId);
        });

        /* ------------------ Combat ------------------ */

        Hooks.on("updateCombat", (combat, updateData, options, userId) => {
            EnhancedConditions._onUpdateCombat(combat, updateData, options, userId);
        });

        /* -------------------------------------------- */
        /*                    Render                    */
        /* -------------------------------------------- */

        /* ------------------- Misc ------------------- */

        Hooks.on("renderSettings", (app, html) => {
            Sidekick.createCTSDiv(html);
            EnhancedConditions._createLabButton(html);
            EnhancedConditions._toggleLabButtonVisibility(Sidekick.getSetting(BUTLER.SETTING_KEYS.enhancedConditions.enable));
        });

        /* ------------------- Chat ------------------- */

        Hooks.on("renderChatLog", (app, html, data) => {
            EnhancedConditions._onRenderChatLog(app, html, data);
        });

        Hooks.on("renderChatMessage", (app, html, data) => {
            EnhancedConditions._onRenderChatMessage(app, html, data);
        });

        Hooks.on("renderDialog", (app, html, data) => {
            switch (app.title) {
                case game.i18n.localize(`${BUTLER.NAME}.ENHANCED_CONDITIONS.ConditionLab.SortDirectionSave.Title`):
                    ConditionLab._onRenderSaveDialog(app, html, data);
                    break;

                case game.i18n.localize(`ENHANCED_CONDITIONS.Lab.RestoreDefaultsTitle`):
                    ConditionLab._onRenderRestoreDefaultsDialog(app, html, data);
                    break;

                default:
                    break;
            }
        });

        /* -------------- Combat Tracker -------------- */

        Hooks.on("renderCombatTracker", (app, html, data) => {
            EnhancedConditions._onRenderCombatTracker(app, html, data);
        });

        /* ---------------- Custom Apps --------------- */

        Hooks.on("renderConditionLab", (app, html, data) => {
            ConditionLab._onRender(app, html, data);
        });
    }
}
