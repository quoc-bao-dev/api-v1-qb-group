import _ from 'lodash';
export function slugGenerate(object) {
    if (object) {
        object.slug = _.kebabCase(object.name);
    }
}
