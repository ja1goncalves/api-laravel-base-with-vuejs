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
    }

    /**
     * @param int $limit
     * @return mixed
     */
    public function all($limit = 20)
    {
        return $this->repository
            ->orderBy('created_at')
            ->setPresenter(UserPresenter::class)
            ->paginate($limit);
    }

    public function find($id, $skipPresenter = false)
    {
        return $this->repository
            ->setPresenter(UserPresenter::class)
            ->skipPresenter($skipPresenter)
            ->find($id);
    }
}
