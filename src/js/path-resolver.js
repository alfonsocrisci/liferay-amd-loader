'use strict';

/**
 * Creates an instance of PathResolver class.
 *
 * @constructor
 */
function PathResolver() {}

PathResolver.prototype = {
    constructor: PathResolver,

    /**
     * Resolves the path of module.
     *
     * @param {string} root Root path which will be used as reference to resolve the path of the dependency.
     * @param {string} dependency The dependency path, which have to be resolved.
     * @return {string} The resolved dependency path.
     */
    resolvePath: function(root, dependency) {
        if (dependency === 'exports' || dependency === 'module' ||
            !(dependency.indexOf('.') === 0 || dependency.indexOf('..') === 0)) {

            return dependency;
        }

        // Split module directories
        var moduleParts = root.split('/');
        // Remove module name
        moduleParts.splice(-1, 1);

        // Split dependency directories
        var dependencyParts = dependency.split('/');
        // Extract dependecy name
        var dependencyName = dependencyParts.splice(-1, 1);

        for (var i = 0; i < dependencyParts.length; i++) {
            var dependencyPart = dependencyParts[i];

            if (dependencyPart === '.') {
                continue;

            } else if (dependencyPart === '..') {
                if (moduleParts.length) {
                    moduleParts.splice(-1, 1);
                }
                else {
                    moduleParts = moduleParts.concat(dependencyParts.slice(i));

                    break;
                }

            } else {
                moduleParts.push(dependencyPart);
            }
        }

        moduleParts.push(dependencyName);

        return moduleParts.join('/');
    }
};