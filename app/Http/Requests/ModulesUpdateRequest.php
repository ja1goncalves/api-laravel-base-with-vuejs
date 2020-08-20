<?php

namespace App\Http\Requests;


class ModulesUpdateRequest extends AppRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:100',
            'icon' => 'sometimes|string|max:100',
            'route' => 'sometimes|string|max:100',
            'status' => 'sometimes|boolean'
        ];
    }
}
