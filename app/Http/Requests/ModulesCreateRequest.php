<?php

namespace App\Http\Requests;

class ModulesCreateRequest extends AppRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'   => 'required|string|max:100|unique:modules,name',
            'icon'   => 'required|string|max:100',
            'route'   => 'required|string|max:100',
            'status' => 'sometimes|boolean'
        ];
    }
}