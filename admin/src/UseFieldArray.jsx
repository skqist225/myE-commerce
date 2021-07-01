import React from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

function UseFieldArray() {
    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    return (
        <form onSubmit={handleSubmit(console.log)}>
            {fields.map(({ id, name, type, amount }, index) => {
                return (
                    <div key={id}>
                        <input
                            {...register(`items.${index}.name`)}
                            name={`items[${index}].name`}
                            type="text"
                            defaultValue={name}
                        />
                        <select
                            {...register(`items.${index}.type`)}
                            name={`items[${index}].type`}
                            defaultValue={type}
                        >
                            <option value="">Select</option>
                            <option value="Itema">ItemA</option>
                            <option value="Itemb">ItemB</option>
                        </select>
                        <input
                            {...register(`items.${index}.amount`)}
                            name={`items[${index}].amount`}
                            type="number"
                            defaultValue={amount}
                        />
                        <button type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                    </div>
                );
            })}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => append({})}>
                Append
            </button>
        </form>
    );
}

export default UseFieldArray;
