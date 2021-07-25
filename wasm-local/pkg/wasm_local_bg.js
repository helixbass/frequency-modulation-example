import * as wasm from './wasm_local_bg.wasm';

const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
*/
export function greet() {
    wasm.greet();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export class FmOsc {

    static __wrap(ptr) {
        const obj = Object.create(FmOsc.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fmosc_free(ptr);
    }
    /**
    */
    constructor() {
        var ret = wasm.fmosc_new();
        return FmOsc.__wrap(ret);
    }
    /**
    * @param {number} gain
    */
    set_gain(gain) {
        wasm.fmosc_set_gain(this.ptr, gain);
    }
    /**
    * @param {number} freq
    */
    set_primary_frequency(freq) {
        wasm.fmosc_set_primary_frequency(this.ptr, freq);
    }
    /**
    * @param {number} note
    */
    set_note(note) {
        wasm.fmosc_set_note(this.ptr, note);
    }
    /**
    * @param {number} amt
    */
    set_fm_amount(amt) {
        wasm.fmosc_set_fm_amount(this.ptr, amt);
    }
    /**
    * @param {number} amt
    */
    set_fm_frequency(amt) {
        wasm.fmosc_set_fm_frequency(this.ptr, amt);
    }
}

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_alert_be40d4fdb6e122aa(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export function __wbg_connect_796a016dae0d9764() { return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).connect(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_connect_439ee8e638c38083() { return handleError(function (arg0, arg1) {
    getObject(arg0).connect(getObject(arg1));
}, arguments) };

export function __wbg_destination_f9a58d7e763557df(arg0) {
    var ret = getObject(arg0).destination;
    return addHeapObject(ret);
};

export function __wbg_new_513f7c570bdcbfc5() { return handleError(function () {
    var ret = new lAudioContext();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_close_d4d3c966433dc452() { return handleError(function (arg0) {
    var ret = getObject(arg0).close();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_createGain_fa8df723598c5011() { return handleError(function (arg0) {
    var ret = getObject(arg0).createGain();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_createOscillator_f8dd8d56f937c0dd() { return handleError(function (arg0) {
    var ret = getObject(arg0).createOscillator();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_gain_f6c8ef1bb6ff877e(arg0) {
    var ret = getObject(arg0).gain;
    return addHeapObject(ret);
};

export function __wbg_value_ca777336f3ba2ae9(arg0) {
    var ret = getObject(arg0).value;
    return ret;
};

export function __wbg_setvalue_6e17b5b4894860a0(arg0, arg1) {
    getObject(arg0).value = arg1;
};

export function __wbindgen_string_new(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbg_settype_952e72688f483ca0(arg0, arg1) {
    getObject(arg0).type = takeObject(arg1);
};

export function __wbg_frequency_df03f59e234cf86e(arg0) {
    var ret = getObject(arg0).frequency;
    return addHeapObject(ret);
};

export function __wbg_start_c349669816506d38() { return handleError(function (arg0) {
    getObject(arg0).start();
}, arguments) };

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_rethrow(arg0) {
    throw takeObject(arg0);
};

