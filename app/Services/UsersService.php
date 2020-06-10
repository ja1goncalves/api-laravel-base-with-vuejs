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

    /**
     * @param int $limit
     * @return mixed
     */
    public function all($limit = 20)
    {
        return $this->repository->orderBy('created_at')->paginate($limit);
    }

    public function find($id, $skipPresenter = false)
    {
        return $this->repository->skipPresenter($skipPresenter)->find($id);
    }
}
