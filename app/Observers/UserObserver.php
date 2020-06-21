<?php

namespace App\Observers;

use App\Entities\User;
use App\Repositories\ModulesRepository;
use App\Repositories\UsersModulesRepository;

class UserObserver
{
    /**
     * @var UsersModulesRepository
     */
    protected $usersModulesRepository;

    /**
     * @var ModulesRepository
     */
    protected $modulesRepository;

    /**
     * UserObserver constructor.
     * @param ModulesRepository $modulesRepository
     * @param UsersModulesRepository $usersModulesRepository
     */
    public function __construct(ModulesRepository $modulesRepository,
                                UsersModulesRepository $usersModulesRepository)
    {
        $this->usersModulesRepository = $usersModulesRepository;
        $this->modulesRepository = $modulesRepository;
    }

    public function created(User $user)
    {
        $modules = $this->modulesRepository->all('id');
        foreach ($modules as $module) {
            $user_module = [
                'user_id' => $user->getAttribute('id'),
                'module_id' => $module->id,
            ];
            $this->usersModulesRepository->create($user_module);
        }
    }
}
