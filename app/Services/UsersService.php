<?php


namespace App\Services;


use App\Presenters\UserPresenter;
use App\Repositories\UserRepository;
use App\Services\Traits\CrudMethods;

class UsersService extends AppService
{
    use CrudMethods;

    /**
     * @var UserRepository
     */
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
        $this->repository->setPresenter(UserPresenter::class);
    }
}
