package utils;

public class FloatValue {
	public static float getMaxValue(float[] scores, int num)
	{
		float max = 0;
		for(int i=0;i<num;i++)
		{
			if(max < scores[i])
			{
				max = scores[i];
			}
		}
		return max;
	}
	public static float getMinValue(float[] scores, int num)
	{
		float min = 100;
		for(int i=0;i<num;i++)
		{
			if(min > scores[i])
			{
				min = scores[i];
			}
		}
		return min;
	}
	public static float getAvgValue(float[] scores, int num)
	{
		float sum = 0;
		for(int i=0;i<num;i++)
		{
			sum += scores[i];
		}
		return sum/num;
	}

}
