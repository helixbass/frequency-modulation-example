import React, {FC} from 'react';
import {flowMax, addState, addStateHandlers, addEffect, addHandlers} from 'ad-hok'
import {addEffectOnMount, branchIfNullish} from 'ad-hok-utils'
import './App.css';

interface PlayButtonProps {
  onToggle: () => void
}

const PlayButton: FC<PlayButtonProps> = flowMax(
  ({onToggle}) => <button onClick={onToggle}>⏯</button>
)

interface PrimaryFrequencyControlProps {
  note: number
  setNote: (newNote: number) => void
}

const PrimaryFrequencyControl: FC<PrimaryFrequencyControlProps> = flowMax(
  addHandlers({
    onChange: ({setNote}) => ({target: {value}}) => {
      setNote(parseInt(value))
    }
  }),
  ({note, onChange}) => <div>
    Primary frequency: <input type="range" min={30} max={80} value={note} onChange={onChange} style={{width: 400}} />
  </div>
)

interface ModulationFrequencyControlProps {
  fmFrequency: number
  setFmFrequency: (newFmFrequency: number) => void
}

const ModulationFrequencyControl: FC<ModulationFrequencyControlProps> = flowMax(
  addHandlers({
    onChange: ({setFmFrequency}) => ({target: {value}}) => {
      setFmFrequency(parseFloat(value))
    }
  }),
  ({onChange, fmFrequency}) => <div>
    Modulation frequency: <input type="range" min={0} max={3} value={fmFrequency} step={0.05} onChange={onChange} style={{width: 400}} />
  </div>
)

interface ModulationAmountControlProps {
  fmAmount: number
  setFmAmount: (newFmAmount: number) => void
}

const ModulationAmountControl: FC<ModulationAmountControlProps> = flowMax(
  addHandlers({
    onChange: ({setFmAmount}) => ({target: {value}}) => {
      setFmAmount(parseFloat(value))
    }
  }),
  ({onChange, fmAmount}) => <div>
    Modulation amount: <input type="range" min={0} max={3} value={fmAmount} step={0.05} onChange={onChange} style={{width: 400}} />
  </div>
)

type WasmImports = typeof import('wasm-local')

const App: FC = flowMax(
  addState('wasmModule', 'setWasmModule', null as WasmImports | null),
  addEffectOnMount(({setWasmModule}) => () => {
    import('wasm-local').then(wasmModule => {
      setWasmModule(wasmModule)
    })
  }),
  branchIfNullish('wasmModule'),
  addStateHandlers(
    {
      isPlaying: false,
    },
    {
      onTogglePlay: ({isPlaying}) => () => ({
        isPlaying: !isPlaying,
      })
    },
  ),
  addState('note', 'setNote', 50),
  addState('fmFrequency', 'setFmFrequency', 0),
  addState('fmAmount', 'setFmAmount', 0),
  addState('fmOsc', 'setFmOsc', null as InstanceType<WasmImports["FmOsc"]> | null),
  addEffect(({isPlaying, setFmOsc, fmOsc, note, fmFrequency, fmAmount, wasmModule: {FmOsc}}) => () => {
    if (isPlaying) {
      const fmOsc = new FmOsc()
      fmOsc.set_note(note)
      fmOsc.set_fm_frequency(fmFrequency)
      fmOsc.set_fm_amount(fmAmount)
      fmOsc.set_gain(0.8)
      setFmOsc(fmOsc)
    } else {
      fmOsc?.free()
      setFmOsc(null)
    }
  }, ['isPlaying']),
  addEffect(({note, fmOsc}) => () => {
    fmOsc?.set_note(note)
  }, ['note']),
  addEffect(({fmFrequency, fmOsc}) => () => {
    fmOsc?.set_fm_frequency(fmFrequency)
  }, ['fmFrequency']),
  addEffect(({fmAmount, fmOsc}) => () => {
    fmOsc?.set_fm_amount(fmAmount)
  }, ['fmAmount']),
  ({onTogglePlay, note, setNote, fmFrequency, setFmFrequency, fmAmount, setFmAmount})  => (
    <div>
      <PlayButton onToggle={onTogglePlay} />
      <PrimaryFrequencyControl note={note} setNote={setNote} />
      <ModulationFrequencyControl fmFrequency={fmFrequency} setFmFrequency={setFmFrequency} />
      <ModulationAmountControl fmAmount={fmAmount} setFmAmount={setFmAmount} />
    </div>
  )
)

export default App;
