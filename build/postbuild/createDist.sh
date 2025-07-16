echo "Creating distribution directory..." && \
rm -rf dist && \
mkdir -p dist && \
for dir in packages/*/; do 
    pkg=$(basename "$dir")
    cp "$dir/package.json" "dist/$pkg/" 2>/dev/null
    [ -d "$dir/dist" ] && mv "$dir/dist" "dist/$pkg/"
done
echo "Distribution directory created successfully."