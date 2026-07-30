import { supabase } from './supabaseClient';

export function logUsageEvent(childId: string, cellId: string, boardId: string): void {
  void supabase
    .from('usage_events')
    .insert({ child_id: childId, cell_id: cellId, board_id: boardId })
    .then(({ error }) => {
      if (error) {
        console.warn('[Bridgely] Failed to log usage event:', error.message);
      }
    });
}

// something interesting here: this is an example of "fire-and-forget" usage instead of
// async/await. If a usage event fails to log, we don't want the entire app to crash,
// so we just log a warning and move on rather than throwing an error.
// the reason we use it here is because a single error with inserting a usage event isn't
// critical to the app's functionality, and the chances of it happening is low anyways.