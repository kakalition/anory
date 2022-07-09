import { useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import NewApiCallBuilder from '../../UseCases/NewAPICallBuilder';

export default function useStoryEditorViewModel() {
  const toast = useToast();
  const params = useParams();
  const [storyId, setStoryId] = useState(-1);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState(-1);

  const [availableCategories, setAvailableCategories] = useState<any[]>([]);

  const buttonText = params.id !== undefined ? 'Update Story' : 'Post Story';

  const showToast = (status: any, toastTitle: string, toastDescription: string | null = null) => {
    toast({
      title: toastTitle,
      description: toastDescription,
      containerStyle: { width: '100%' },
      duration: 2000,
      status,
    });
  };

  const onFetchStorySuccess = (response: AxiosResponse) => {
    setStoryId(response.data.id);
    setTitle(response.data.title);
    setBody(response.data.body);
    setCategoryId(response.data.category.id);
  };

  const onFetchStoryFailed = () => {
    showToast('error', 'Failed to Get Story Data', 'Please try again.');
  };

  const fetchStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/stories/${params.id}`)
    .addMethod('GET')
    .addOnSuccess(onFetchStorySuccess)
    .addOnFailed(onFetchStoryFailed);

  const onPostStorySuccess = () => {
    showToast('success', 'Story Posted');
  };

  const onPostStoryFailed = () => {
    showToast('error', 'Failed to Create Story');
  };

  const postStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/stories')
    .addMethod('POST')
    .addPayload({
      title,
      body,
      category_id: categoryId,
    })
    .addOnSuccess(onPostStorySuccess)
    .addOnFailed(onPostStoryFailed);

  const onUpdateStorySuccess = () => {
    showToast('success', 'Story Updated');
  };

  const onUpdateStoryFailed = (error: any) => {
    showToast('error', 'Failed to Update Story', error.response.data.message);
  };

  const updateStoryAPI = NewApiCallBuilder.getInstance()
    .addEndpoint(`api/stories/${storyId}`)
    .addMethod('PUT')
    .addPayload({
      modified_title: title,
      modified_body: body,
      modified_category_id: categoryId,
    })
    .addOnSuccess(onUpdateStorySuccess)
    .addOnFailed(onUpdateStoryFailed);

  const onSubmitStoryClick: React.MouseEventHandler = () => {
    const action = params.id !== undefined
      ? updateStoryAPI.call
      : postStoryAPI.call;

    action();
  };

  const onGetCategoriesSuccess = (response: AxiosResponse) => setAvailableCategories(response.data);
  const onGetCategoriesFailed = (error: any) => showToast('error', error.response.data.message, 'Try refresh this page.');

  const getCategoriesAPI = NewApiCallBuilder.getInstance()
    .addEndpoint('api/categories')
    .addMethod('GET')
    .addOnSuccess(onGetCategoriesSuccess)
    .addOnFailed(onGetCategoriesFailed);

  const categoriesElement = useMemo(() => availableCategories.map(
    (element) => <option key={element.id} value={element.id}>{element.name}</option>,
  ), [availableCategories]);

  useEffect(() => {
    getCategoriesAPI.call();
    if (params.id !== undefined) fetchStoryAPI.call();
  }, []);

  return {
    title,
    setTitle,
    body,
    setBody,
    categoryId,
    setCategoryId,
    categoriesElement,
    onSubmitStoryClick,
    buttonText,
  };
}
