<?php


namespace App\Services;


use App\Presenters\UserPresenter;
use App\Repositories\UserRepository;
use App\Services\Traits\CrudMethods;
use App\Transformers\UserFindTransformer;

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

    /**
     * @param $id
     * @param bool $skipPresenter
     * @return mixed
     */
    public function find($id, $skipPresenter = false)
    {
        return $this->repository
            ->with('modules.usersModules.actions')
            ->find($id);
    }
}
