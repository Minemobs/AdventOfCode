import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;
import java.io.BufferedReader;
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;

public class Main {

	public static void main(String[] args) throws IOException {
		BufferedReader reader = Files.newBufferedReader(Path.of("input.txt"));
		List<String> strs = new ArrayList<>();
		reader.lines().forEach(strs::add);
		List<Integer> ints = new ArrayList<>();
		List<Integer> temp = new ArrayList<>();
		for(int i = 0; i < strs.size(); i++) {
			String str = strs.get(i);
			if(!str.isEmpty()) temp.add(Integer.parseInt(str));
			else {
				int j = 0;
				for(int k : temp) {
					j+=k;
				}
				ints.add(j);
				temp.clear();
			}
		}
		Collections.sort(ints);
		System.out.println("First: " + ints.get(0) + "\nLast: " + ints.get(ints.size() - 1));
		System.out.println("Top 3 : " + (ints.get(ints.size() - 1) + ints.get(ints.size() - 2) + ints.get(ints.size() - 3)));
	}

}