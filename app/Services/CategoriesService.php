<?php


namespace App\Services;


use App\Presenters\CategoriesPresenter;
use App\Repositories\CategoriesRepository;
use App\Services\Traits\CrudMethods;
use Illuminate\Support\Facades\Auth;

class CategoriesService extends AppService
{
    use CrudMethods;

    /**
     * @var CategoriesRepository
     */
    protected $repository;

    public function __construct(CategoriesRepository $repository)
    {
        $this->repository = $repository;
        $this->repository->setPresenter(CategoriesPresenter::class);
    }

    /**
     * @param int $limit
     * @return mixed
     */
    public function all($limit = 20)
    {
        return $this->repository
            ->orderBy('created_at')
            ->with(['createdBy' => function ($query) {
                return $query->select(['name', 'id']);
            }, 'updatedBy' => function ($query) {
                return $query->select(['name', 'id']);
            }])
            ->paginate($limit);
    }

    public function find($id, $skipPresenter = false)
    {
        return $this->repository
            ->with(['createdBy', 'updatedBy'])
            ->skipPresenter($skipPresenter)
            ->find($id);
    }

    /**
     * @param array $data
     * @param bool $skipPresenter
     * @return mixed
     */
    public function create(array $data, $skipPresenter = false)
    {
        $data['created_by'] = Auth::user()->id;
        $data['updated_by'] = Auth::user()->id;

        return $this->repository->skipPresenter($skipPresenter)->create($data);
    }

    /**
     * @param array $data
     * @param $id
     * @return array|mixed
     */
    public function update(array $data, $id)
    {
        $data['updated_by'] = Auth::user()->id;

        return $this->repository->update($data, $id);
    }
}
