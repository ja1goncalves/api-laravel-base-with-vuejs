<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppRequest extends FormRequest
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
            //
        ];
    }

    /**
     * @return array|string[]
     */
    public function messages()
    {
        return [
            'required'  => 'O campo :attribute é obrigatório!',
            'unique'    => ':attribute já cadastrado!',
            'string'    => ':attribute tem que ser tipo string',
            'boolean'   => ':attribute tem que ser tipo boolean',
            'exists'    => ':attribute não existe!',
            'min'       => ':attribute deve ter no minimo :min caracteres',
            'max'       => ':attribute deve ter no máximo :max caracteres',
            'email'     => ':attribute deve ter formato de e-mail',
            'confirmed' => 'A senha não conbinou com a confirmação',
            'integer'   => ':attribute deve ser do tipo int'
        ];
    }
}
