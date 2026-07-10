import { supabase } from '../lib/supabase.js';
import { adminFetch } from './adminApi.js';

export async function getArtworksByCategory(categoryId) {
  const { data: artworksData, error: artworksError } = await supabase
    .from('artworks')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
  if (artworksError) throw artworksError;

  if (!artworksData || artworksData.length === 0) return [];

  const artworkIds = artworksData.map((a) => a.id);
  const { data: ratingsData, error: ratingsError } = await supabase
    .from('artwork_ratings_summary')
    .select('artwork_id, average_rating, rating_count')
    .in('artwork_id', artworkIds);
  if (ratingsError) throw ratingsError;

  const ratingsMap = new Map(
    (ratingsData || []).map((r) => [r.artwork_id, r])
  );

  return artworksData.map((art) => ({
    ...art,
    artwork_ratings_summary: ratingsMap.get(art.id) || null,
  }));
}

export async function getArtworkById(artworkId) {
  const { data: art, error: artError } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', artworkId)
    .single();
  if (artError) throw artError;

  const { data: rating, error: ratingError } = await supabase
    .from('artwork_ratings_summary')
    .select('average_rating, rating_count')
    .eq('artwork_id', artworkId)
    .maybeSingle();
  if (ratingError) throw ratingError;

  return { ...art, artwork_ratings_summary: rating };
}

export function addArtwork({ categoryId, title, description, mediaUrl, mediaType, thumbnailUrl, subcategory = null }) {
  return adminFetch('/artworks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId, title, description, mediaUrl, mediaType, thumbnailUrl, subcategory }),
  });
}

export function updateArtwork(artworkId, updates) {
  const finalUpdates = {
    ...updates,
    subcategory: updates.subcategory === undefined ? null : updates.subcategory
  };
  return adminFetch('/artworks', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artworkId, updates: finalUpdates }),
  });
}

export async function deleteArtwork(artworkId) {
  await adminFetch('/artworks', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artworkId }),
  });
  return true;
}