import preload from './preload';
import create from './create';
import update from './update';

export default function (opts) {
    return {
        preload: function () {
            this.opts = opts;
            preload.call(this);
        },
        create,
        update
    };
}
