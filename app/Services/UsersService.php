<?php


namespace App\Services;


use App\Presenters\UserPresenter;
use App\Repositories\UserRepository;
use App\Repositories\UsersModulesRepository;
use App\Services\Traits\CrudMethods;

class UsersService extends AppService
{
    use CrudMethods;

    /**
     * @var UserRepository
     */
    protected $repository;

    /**
     * @var UsersModulesRepository
     */
    protected $usersModulesRepository;

    public function __construct(UserRepository $repository, UsersModulesRepository $usersModulesRepository)
    {
        $this->repository = $repository;
        $this->usersModulesRepository = $usersModulesRepository;
        $this->repository->setPresenter(UserPresenter::class);
    }

    /**
     * @param $id
     * @param bool $skipPresenter
     * @return mixed
     */
    public function find($id, $skipPresenter = false)
    {
        $user = $this->repository
            ->with('modules')
            ->find($id);

        $modules = $user['data']['modules']->toArray();
        foreach ($modules as $key => $module) {
            $user_module = $this->usersModulesRepository
                ->with('actions')
                ->findWhere(['user_id' => $user['data']['id'], 'module_id' => $module['id']])
                ->first()->toArray();
            $user['data']['modules'][$key]['user_module'] = $user_module;
        }
        return $user;
    }
}
