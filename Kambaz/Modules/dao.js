import ModuleModel from "./model.js";
import { v4 as uuidv4 } from 'uuid'; // You might need to install: npm install uuid

export async function createModule(module) {
  // Don't delete _id, but generate one if it doesn't exist
  if (!module._id) {
    // Generate a short ID similar to your existing pattern (M101, M102, etc.)
    // Or use a UUID for uniqueness
    const randomId = `M${Date.now().toString().slice(-6)}`; // Generates IDs like M123456
    module._id = randomId;
  }
  
  const created = await ModuleModel.create(module);
  return created.toObject(); 
}

export function findModulesForCourse(courseId) {
  return ModuleModel.find({ course: courseId }).lean();
}

export function deleteModule(moduleId) {
  // Try to delete by _id first, if that fails try by name
  return ModuleModel.deleteOne({ 
    $or: [
      { _id: moduleId },
      { name: moduleId }
    ]
  });
}

export async function updateModule(moduleId, moduleUpdates) {
  // Try to find by _id first, if that fails try by name
  const updated = await ModuleModel.findOneAndUpdate(
    { 
      $or: [
        { _id: moduleId },
        { name: moduleId }
      ]
    },
    moduleUpdates,
    { new: true }
  );
  
  return updated;
}

export function findModuleById(moduleId) {
  // Try to find by _id first, if that fails try by name
  return ModuleModel.findOne({
    $or: [
      { _id: moduleId },
      { name: moduleId }
    ]
  });
}