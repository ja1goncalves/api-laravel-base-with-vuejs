<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|string|min:5|max:120',
            'email' => 'sometimes|string|email|max:150|unique:users,email',
            'password' => 'sometimes|string|min:8|confirmed',
            'status'  => 'sometimes|integer',
            'role' => 'sometimes|string|min:5|max:50'
        ];
    }
}
