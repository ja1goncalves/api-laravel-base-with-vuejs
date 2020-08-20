<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\CrudMethods;
use App\Services\CategoriesService;
use Illuminate\Http\Request;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CategoriesCreateRequest;
use App\Http\Requests\CategoriesUpdateRequest;
use App\Validators\CategoriesValidator;

/**
 * Class UsersController.
 *
 * @package namespace App\Http\Controllers;
 */
class CategoriesController extends Controller
{
    use CrudMethods {
        store as generalStore;
        update as generalUpdate;
    }

    /**
     * @var CategoriesService
     */
    protected $service;

    /**
     * @var CategoriesValidator
     */
    protected $validator;

    /**
     * UsersController constructor.
     *
     * @param CategoriesService $service
     * @param CategoriesValidator $validator
     */
    public function __construct(CategoriesService $service, CategoriesValidator $validator)
    {
        $this->service = $service;
        $this->validator  = $validator;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CategoriesCreateRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(CategoriesCreateRequest $request)
    {
        return $this->generalStore($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoriesUpdateRequest $request
     * @param string $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidatorException
     */
    public function update(CategoriesUpdateRequest $request, $id)
    {
        return $this->generalUpdate($request, $id);
    }
}
