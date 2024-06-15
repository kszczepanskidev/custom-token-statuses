import * as BUTLER from "./butler.js";
/**
 * Provides helper methods for use elsewhere in the module (and has your back in a melee)
 */
export class Sidekick {
    /**
     * Creates the CTS div in the Sidebar
     * @param {*} html
     */
    static createCTSDiv(html) {
        if (!game.user.isGM) return;

        const ctsDiv = $(
            `<div id="custom-token-statuses">
                    <h4>Custom Token Statuses</h4>
                </div>`
        );

        const setupButton = html.find("div#settings-game");
        setupButton.append(ctsDiv);
    }

    /**
     * Get a single setting using the provided key
     * @param {*} key
     * @returns {Object} setting
     */
    static getSetting(key) {
        return game.settings.get(BUTLER.NAME, key);
    }

    /**
     * Sets a single game setting
     * @param {*} key
     * @param {*} value
     * @param {*} awaitResult
     * @returns {Promise | ClientSetting}
     */
    static setSetting(key, value, awaitResult=false) {
        if (!awaitResult) {
            return game.settings.set(BUTLER.NAME, key, value);
        }

        game.settings.set(BUTLER.NAME, key, value).then(result => {
            return result;
        }).catch(rejected => {
            throw rejected;
        });
    }

    /**
     * Register a single setting using the provided key and setting data
     * @param {*} key
     * @param {*} metadata
     * @returns {ClientSettings.register}
     */
    static registerSetting(key, metadata) {
        return game.settings.register(BUTLER.NAME, key, metadata);
    }

    /**
     * Register a menu setting using the provided key and setting data
     * @param {*} key
     * @param {*} metadata
     * @returns {ClientSettings.registerMenu}
     */
    static registerMenu(key, metadata) {
        return game.settings.registerMenu(BUTLER.NAME, key, metadata);
    }

    /**
     * Gets the default game system names stored in the constants butler class
     */
    static getSystemChoices() {
        const systemIds = Object.getOwnPropertyNames(BUTLER.KNOWN_GAME_SYSTEMS);
        const result = {};

        for (let i of systemIds) {
            result[i] = BUTLER.KNOWN_GAME_SYSTEMS[i].name;
        }
        return result;
    }

    /**
     * Use FilePicker to browse then Fetch one or more JSONs and return them
     * @param {*} source
     * @param {*} path
     */
    static async fetchJsons(source, path) {
        const extensions = [".json"];
        const fp = await FilePicker.browse(source, path, {extensions});
        const fetchedJsons = fp?.files?.length ? await Promise.all(fp.files.map(f => Sidekick.fetchJson(f))) : [];
        const jsons = fetchedJsons.filter(j => !!j);

        return jsons;
    }

    /**
     * Fetch a JSON from a given file
     * @param {File} file
     * @returns JSON | null
     */
    static async fetchJson(file) {
        try {
            const jsonFile = await fetch(file);
            const json = await jsonFile.json();
            if (!json instanceof Object) throw new Error("Not a valid JSON!");
            return json;
        } catch (e) {
            console.warn(e.message);
            return null;
        }
    }

    /**
     * Retrieves a key using the given value
     * @param {Object} object -- the object that contains the key/value
     * @param {*} value
     */
    static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    /**
     * Adds additional handlebars helpers
     */
    static handlebarsHelpers() {
        Handlebars.registerHelper("cub-concat", () => {
            let result;

            for (let a in arguments) {
                result += (typeof arguments[a] === "string" ? arguments[a] : "");
            }
            return result;
        });
    }

    /**
     * Adds additional jquery helpers
     */
    static jQueryHelpers() {
        jQuery.expr[':'].icontains = function(a, i, m) {
            return jQuery(a).text().toUpperCase()
                .indexOf(m[3].toUpperCase()) >= 0;
        };
    }

    /**
    * Get a random unique Id, checking an optional supplied array of ids for a match
    * @param {*} existingIds
    */
    static createId(existingIds=[], {iterations=10000, length=16}={}) {

       let i = 0;
       while(i < iterations) {
           const id = randomID(length);
           if (!existingIds.includes(id)) {
               return id;
           }
           i++;
           console.log(`Combat Utility Belt - Sidekick | Id ${id} already exists in the provided list of ids. ${i ? `This is attempt ${i} of ${iterations} `: ""}Trying again...`);
       }

       throw new Error(`Combat Utility Belt - Sidekick | Tried to create a unique id over ${iterations} iterations and failed.`)
    };

    /**
     * Sets a string to Title Case
     * @param {*} string
     */
    static toTitleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    /**
     * For a given string generate a slug, optionally checking a list of existing Ids for uniqueness
     * @param {*} string
     * @param {*} idList
     */
    static generateUniqueSlugId(string, idList=[]) {
        let slug = string.slugify();

        const existingIds = idList.filter(id => id === slug);

        if (!existingIds.length) return slug;

        const uniqueIndex = existingIds.length > 1 ? Math.max(...existingIds.map(id => id.match(/\d+/g)[0])) + 1 : 1;
        slug = slug.replace(/\d+$/g, uniqueIndex);

        return slug;
    }

    /**
     * For a given file path, find the filename and then apply title case
     * @param {String} path
     * @returns {String}
     */
    static getNameFromFilePath(path) {
        if (!path) return null;

        const file = path.split("\\").pop().split("/").pop();

        if (!file) return null;

        const filename = file.replace(/\.[^/.]+$/, "");

        if (!filename) return null;

        const name = Sidekick.toTitleCase(filename);
        return name;
    }

    /**
     * Loads templates for partials
     */
    static async loadTemplates() {
        const templates = [
            `${BUTLER.PATH}/templates/partials/condition-lab-row.hbs`,
        ];
        await loadTemplates(templates)
    }

    static consoleMessage(type, source, {objects=[], message="", subStr=[]}) {
        const msg = `${BUTLER.TITLE} | ${source} :: ${message}`;
        const params = [];
        if (objects && objects.length) params.push(objects);
        if (msg) params.push(msg);
        if (subStr && subStr.length) params.push(subStr);
        return console[type](...params);
    }

    /**
     * Converts the given string to camelCase using the provided delimiter to break up words
     * @param {String} string
     * @param {String} delimiter
     * @returns the converted string
     * @example Sidekick.toCamelCase("my-cool-string", "-") // returns "myCoolString"
     */
    static toCamelCase(string, delimiter) {
        const stringParts = string.split(delimiter);
        return stringParts instanceof Array ? stringParts.reduce((camelString, part, index) => {
            return camelString += index > 0 ? Sidekick.toTitleCase(part) : part;
        }, "") : stringParts;
    }
}
