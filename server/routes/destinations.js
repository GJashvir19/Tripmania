import { Router } from 'express';
import Destination from '../models/Destination.js';
import { indiaRegions } from '../data/indiaRegions.js';

const router = Router();

router.get('/states', (request, response) => response.json({ states: indiaRegions }));

router.get('/filters', async (request, response, next) => {
  try {
    const states = await Destination.distinct('state');
    const subdivisions = await Destination.aggregate([
      { $group: { _id: '$state', subdivisions: { $addToSet: '$subdivision' } } },
      { $project: { _id: 0, state: '$_id', subdivisions: 1 } },
      { $sort: { state: 1 } }
    ]);
    return response.json({ states: states.sort(), subdivisions });
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (request, response, next) => {
  try {
    const filter = {};
    if (request.query.state) filter.state = request.query.state;
    if (request.query.subdivision) filter.subdivision = request.query.subdivision;
    if (request.query.search) filter.$or = [
      { name: { $regex: request.query.search, $options: 'i' } },
      { state: { $regex: request.query.search, $options: 'i' } },
      { tags: { $regex: request.query.search, $options: 'i' } }
    ];
    const destinations = await Destination.find(filter).sort({ state: 1, name: 1 });
    return response.json({ destinations });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const destination = await Destination.findById(request.params.id);
    if (!destination) return response.status(404).json({ message: 'Destination not found.' });
    return response.json({ destination });
  } catch (error) {
    return next(error);
  }
});

export default router;
